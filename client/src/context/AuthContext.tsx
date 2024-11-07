/* eslint-disable react-refresh/only-export-components */
// src/context/AuthContext.ts
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, signInWithPopup, provider, signOut } from '../firebase';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface AuthContextType {
  currentUser: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      const email = user.email;
      const username = user.displayName;
      const profile_picture_url = user.photoURL;
      const phone_number = user.phoneNumber;

      try {

        const registerResponse = await axios.post('http://localhost:3000/api/v1/register', {
          username,
          email,
          profile_picture_url,
          phone_number
        });

        if (registerResponse.status === 201) {
          console.log('User registered successfully');
          navigate('/assessment');
        }

        navigate('/');

      } catch (error) {
        console.error('API Error:', error);
      }

    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      navigate('/')
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
