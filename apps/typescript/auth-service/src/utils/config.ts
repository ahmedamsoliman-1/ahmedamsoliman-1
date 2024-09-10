import dotenv from 'dotenv';
dotenv.config();


export const Config = {
    mongo_uri: process.env.MONGO_URI,
    port: process.env.PORT || 3000,
    secret_key: process.env.SECRET_KEY || '',
    jwt_secret: process.env.JWT_SECRET,
}