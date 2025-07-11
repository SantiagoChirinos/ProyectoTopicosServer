import { Model } from 'mongoose';
import { User } from './user.interface';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    findByUsername(username: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    insertMany(users: User[]): Promise<any>;
}
