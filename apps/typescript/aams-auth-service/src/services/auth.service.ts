import { UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { logger } from '../middleware/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export class AuthService {
    async register(username: string, password: string): Promise<void> {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            await UserModel.create({ username, password: hashedPassword });
            logger.info(`User ${username} registered successfully`);
        } catch (error) {
            logger.error(`Register error: ${(error as Error).message}`);
            throw error;
        }
    }

    async login(username: string, password: string): Promise<string> {
        try {
            const user = await UserModel.findOne({ username });
            if (!user || !(await bcrypt.compare(password, user.password))) {
                logger.warn(`Login failed for ${username}`);
                throw new Error('Invalid credentials');
            }
            const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
            logger.info(`User ${username} logged in successfully`);
            return token;
        } catch (error) {
            logger.error(`Login error: ${(error as Error).message}`);
            throw error;
        }
    }
}
