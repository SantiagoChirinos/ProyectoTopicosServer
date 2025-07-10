import { UsersService } from './users.service';
import { User } from './user.interface';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    insertUsers(users: User[]): Promise<any>;
    getAllUsers(): Promise<User[]>;
    getUserByUsername(username: string): Promise<User>;
}
