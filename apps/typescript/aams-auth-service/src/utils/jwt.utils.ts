import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const generateToken = (username: string): string => {
    return jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): string | object => {
    return jwt.verify(token, JWT_SECRET);
};
