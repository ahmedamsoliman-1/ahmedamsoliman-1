import { IDatabaseService } from './database.interface';
import cassandra from 'cassandra-driver';
import { Client } from 'cassandra-driver';

export class CassandraService implements IDatabaseService {
    private client: Client;

    constructor() {
        this.client = new cassandra.Client({
            contactPoints: [process.env.CASSANDRA_CONTACT_POINT || 'localhost'],
            localDataCenter: process.env.CASSANDRA_LOCAL_DATA_CENTER || 'datacenter1',
            keyspace: process.env.CASSANDRA_KEYSPACE || 'authdb',
        });
    }

    async connect(): Promise<void> {
        await this.client.connect();
        console.log('Connected to Cassandra');
    }

    async disconnect(): Promise<void> {
        await this.client.shutdown();
    }

    async createUser(username: string, password: string): Promise<void> {
        const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
        await this.client.execute(query, [username, password], { prepare: true });
    }

    async findUserByUsername(username: string): Promise<any> {
        const query = 'SELECT * FROM users WHERE username = ?';
        const result = await this.client.execute(query, [username], { prepare: true });
        return result.rows[0];
    }
}
