import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    username: string | null;
    email: string;
    profile_picture_url: string | null; 
    phone_number: string | null; 
    A : number | null;
    createdAt: Date;
    updatedAt: Date;
}

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
        default: null, 
    },
    phone_number: {
        type: String,
        default: null, 
    }, 
    A: {
        type: Number,
        default: null, 
    }
}, {
    timestamps: true,
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
