import mongoose, { Document, Model, Schema } from 'mongoose';
import { getDatabaseClient } from '../config/database';

export interface IUser extends Document {
    username: string;
    password: string;
}

const userSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const mongoClient = getDatabaseClient().mongo;

export const UserModel: Model<IUser> = mongoClient?.model('User', userSchema) || mongoose.model('User', userSchema);
