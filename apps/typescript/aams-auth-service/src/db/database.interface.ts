export interface IDatabaseService {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    createUser(username: string, password: string): Promise<void>;
    findUserByUsername(username: string): Promise<any>;
}
