import mongoose from 'mongoose';
import { Client } from 'cassandra-driver';
import { config } from 'dotenv';

config(); // Load environment variables

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/authdb';
const cassandraUri = process.env.CASSANDRA_URI || 'cassandra://localhost:9042';

let mongoClient: mongoose.Mongoose | null = null;
let cassandraClient: Client | null = null;

export const connectToDatabase = async () => {
    if (!mongoClient) {
        mongoClient = await mongoose.connect(mongoUri); // Removed deprecated options
        console.log('Connected to MongoDB');
    }

    // if (!cassandraClient) {
    //     cassandraClient = new Client({ contactPoints: [cassandraUri], localDataCenter: 'datacenter1' });
    //     await cassandraClient.connect();
    //     console.log('Connected to Cassandra');
    // }
};

export const getDatabaseClient = () => {
    return { mongo: mongoClient, cassandra: cassandraClient };
};
