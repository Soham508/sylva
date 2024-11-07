import { Request, Response } from 'express';
import User, { IUser } from '../models/userModel';


export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, profile_picture_url, phone_number } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists with this email.' });
            return;
        }

        const user = new User({
            username: username || null,
            email,
            profile_picture_url: profile_picture_url || null,
            phone_number: phone_number || null
        });

        await user.save(); 
        console.log("user registered")
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(400).json({ error: error});
    }
};

export const checkUser = async (req: Request, res: Response) => {

    try {
        
        const { email } : {email : String} = req.body; 
        const user = await User.findOne({ email }); 
        if (user) {
            res.status(200).json({ exists: true}); 
        } else {
            res.status(200).json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const getUser = async (req: Request, res: Response) => {
   
    try {
        const { email } : {email:String} = req.body; 
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        console.log('user regeuested');
        res.status(201).json({ message: 'User found', user });
    } catch (error) {
            res.status(500).json({ error: error});
    }
};