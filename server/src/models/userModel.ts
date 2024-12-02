import mongoose, { Document, Schema } from 'mongoose';

// Define interfaces for the new data types
interface PortfolioDetail {
    "%_of_portfolio": number;
    investment_amount: number;
    quantity?: number;
    price_per_share?: number;
}

export interface Portfolio {
    [ticker: string]: PortfolioDetail;
}

interface Action {
    action: string;
    quantity: number;
}

export interface Actions {
    [ticker: string]: Action;
}

interface RiskStateEntry {
    value: string;
    score: number;
}

export interface RiskState {
    questions: RiskStateEntry[];
    tickers: string[];
    Investment_amount: number;
}

// Define the IUser interface with new fields
export interface IUser extends Document {
    username: string | null;
    email: string;
    profile_picture_url: string | null;
    phone_number: string | null;
    A: number | null;
    initial_portfolio: Portfolio;
    target_portfolio: Portfolio;
    actions: Actions;
    riskState: RiskState;
    createdAt: Date;
    updatedAt: Date;
}

// Define the user schema with additional fields
const userSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    profile_picture_url: {
        type: String,
        default: null,  // Default to null if not provided
    },
    phone_number: {
        type: String,
        default: null,  // Default to null if not provided
    },
    A: {
        type: Number,
        default: -1,  // Default to -1 (or null) for initial value
    },
    initial_portfolio: {
        type: Schema.Types.Mixed,
        default: {},  // Default empty object if not provided
    },
    target_portfolio: {
        type: Schema.Types.Mixed,
        default: {},  // Default empty object if not provided
    },
    actions: {
        type: Schema.Types.Mixed,
        default: {},  // Default empty object if not provided
    },
    riskState: {
        questions: [
            {
                value: { type: String, required: true },
                score: { type: Number, required: true }
            }
        ],
        tickers: {
            type: [String],  // Array of tickers (optional)
            default: []      // Default to an empty array
        },
        Investment_amount: {
            type: Number,
            default: 0, // Default to 0 if not provided
        }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;

