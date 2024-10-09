import { IMessageResponse } from './MessageResponse';

interface IUserService {
    getAllUsers(): Promise<IUser[] | null>; // get all users from the database
    getUserByID(id: number): Promise<IUser | null>; // get user info from the database
    createUser(user: IUser): Promise<IUser | IMessageResponse>; // create a new user in the database
}

interface IUser {
    id: number;
    name: string;
    email: string;
    role?: {
        name: string;
        permissions: string[];
    };
    roleId?: number;
}

export { IUserService, IUser };
