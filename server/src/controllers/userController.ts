import { Request, Response } from 'express';
import User, { Actions, Portfolio, RiskState } from '../models/userModel';

interface userPortfolioData {
    initial_portfolio: Portfolio;
    target_portfolio: Portfolio;
    actions: Actions;
    riskState: RiskState;
    email:string;
}

export const updateUserPortfolio = async (req: Request, res: Response) => {
    try {

        const { initial_portfolio, target_portfolio, actions, riskState, email }: userPortfolioData = req.body;
        // Validate the input fields (optional, add more validation if needed)
        if (!initial_portfolio || !target_portfolio || !actions || !riskState) {
            res.status(400).json({ message: "Missing required fields" });
        }

        const updatedUser = await User.findOneAndUpdate(
            { email }, // Search for the user by email
            {
                $set: {
                    initial_portfolio,
                    target_portfolio,
                    actions,
                    riskState
                }
            },
            { new: true } // Return the updated document
        );

        // If user not found, return an error
        if (!updatedUser) {
             res.status(404).json({ message: "User not found" });
             return;
        }

        // Respond with the updated user data
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Error updating user'});
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const { username, email, profile_picture_url, phone_number } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log(existingUser);
            res.status(200).json({ message: 'User already exists with this email.', existingUser,  userCreated:false });
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
        res.status(201).json({ message: 'User created successfully', user, userCreated:true });

    } catch (error) {
        res.status(400).json({ error: error, message: "failed to register"});
        console.log("failed to register")
        return;
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

export const getUserPortfolio = async(req:Request, res:Response) => {
    try {
        const { email } = req.body; 
    
        const user = await User.findOne({email}, {
          initial_portfolio: 1,  
          target_portfolio: 1,  
          actions: 1,          
        });
    
        if (!user) {
          res.status(404).json({
            message: 'User not found', success:false
          });
          return;
        }
    
        res.status(200).json({
          portfolioData: {
            initial_portfolio: user.initial_portfolio,
            target_portfolio: user.target_portfolio,
            actions: user.actions,
          },
          success: true,
        });
      } catch (err) {
        res.status(500).json({
          message: 'Failed to fetch user portfolio and actions',
          error: err,
        });
      }
}