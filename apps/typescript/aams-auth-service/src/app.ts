import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.routes';
import { connectToDatabase } from './config/database';
import { logger } from './middleware/logger';

const app = express();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);


app.listen(4444, async () => {
    try {
        await connectToDatabase();
        logger.info('Server started on port 4444');
    } catch (error) {
        logger.error(`Server start error: ${(error as Error).message}`);
        process.exit(1);
    }
});
