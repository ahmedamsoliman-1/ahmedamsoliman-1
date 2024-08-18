// src/controllers/authController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
    ],
});

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            logger.warn('Registration attempt with missing username or password', { username });
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            logger.warn('Registration attempt with existing username', { username });
            return res.status(400).json({ message: 'Username already taken' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();

        logger.info('User registered successfully', { username });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        logger.error('Registration error', { error, username: req.body.username });
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            logger.warn('Login attempt with missing username or password', { username });
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            logger.warn('Login attempt with non-existent username', { username });
            return res.status(404).json({ message: 'User not found' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            logger.warn('Login attempt with invalid credentials', { username });
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        logger.info('Login successful', { username });
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        logger.error('Login error', { error, username: req.body.username });
        res.status(500).json({ message: 'Internal server error' });
    }
};

