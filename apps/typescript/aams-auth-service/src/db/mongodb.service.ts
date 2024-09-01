import { IDatabaseService } from './database.interface';
import mongoose from 'mongoose';
import { UserModel } from '../models/user.model';

export class MongoDBService implements IDatabaseService {
    async connect(): Promise<void> {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/authdb';
        await mongoose.connect(mongoUri);
        console.log('Connected to MongoDB');
    }

    async disconnect(): Promise<void> {
        await mongoose.disconnect();
    }

    async createUser(username: string, password: string): Promise<void> {
        const user = new UserModel({ username, password });
        await user.save();
    }

    async findUserByUsername(username: string): Promise<any> {
        return await UserModel.findOne({ username });
    }
}
