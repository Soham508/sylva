// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCvPrBOIUeQZI5gEMHtiif-iV7u4wurHnc",
  authDomain: "sylva-687f1.firebaseapp.com",
  projectId: "sylva-687f1",
  storageBucket: "sylva-687f1.appspot.com",
  messagingSenderId: "155632303064",
  appId: "1:155632303064:web:3e8cbf3c3180ff1b1250ad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider, signInWithPopup, signOut };