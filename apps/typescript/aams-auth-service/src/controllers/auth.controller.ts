import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { logger } from '../middleware/logger';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        await authService.register(username, password);
        res.status(201).send('User registered');
    } catch (error) {
        logger.error(`Register error: ${(error as Error).message}`);
        res.status(500).send('Registration failed');
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const token = await authService.login(username, password);
        res.status(200).json({ token });
    } catch (error) {
        logger.error(`Login error: ${(error as Error).message}`);
        res.status(500).send('Login failed');
    }
};
