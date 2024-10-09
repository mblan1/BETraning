import { ERoles } from '../config/enum';
import { appDataSource } from '../config/typeorm';
import { IMessageResponse } from '../interface/MessageResponse';
import { IUser, IUserService } from '../interface/User';
import { Users } from '../models/User.model';

export class UserService implements IUserService {
    /**
     *
     * @returns all users data from database
     * @throws error if got an error while fetching users data or no users found
     */
    async getAllUsers(): Promise<IUser[] | null> {
        const users = await appDataSource
            .getRepository(Users)
            .find({
                relations: ['role'],
            })
            .catch((error) => {
                throw new Error('Got an error while fetching users data: method getAllUsers');
            });

        // check if no users found
        if (!users) {
            return null;
        }

        // return users data
        return users.map((user) => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: {
                    name: user.role.name,
                    permissions: user.role.roleWithPermission.map((role) => {
                        return role.permission.name;
                    }),
                },
            };
        });
    }

    /**
     *
     * @param userID user id
     * @returns user data from database or null if user not found
     */
    async getUserByID(userID: number): Promise<IUser | null> {
        // get user data from database
        const userData = await appDataSource
            .getRepository(Users)
            .findOne({
                where: {
                    id: userID,
                },
                relations: ['role', 'role.roleWithPermission', 'role.roleWithPermission.permission'],
            })
            .catch(() => {
                throw new Error('Got an error while fetching user data: method getUser');
            });

        // check if user not found
        if (!userData) {
            return null;
        }

        // return user data
        return {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: {
                name: userData.role.name,
                permissions: userData.role.roleWithPermission.map((role) => {
                    return role.permission.name;
                }),
            },
        };
    }

    /**
     *
     * @param user user data
     * @returns created user data
     * @throws error if got an error while creating user
     */
    async createUser(user: IUser): Promise<IUser | IMessageResponse> {
        const newUser = new Users();
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.roleId = user.roleId ?? ERoles.USER;

        // check if user already exists
        const existedUser = await appDataSource
            .getRepository(Users)
            .findOne({
                where: {
                    email: user.email,
                },
            })
            .catch(() => {
                throw new Error('Got an error while checking user existence: method createUser');
            });

        if (existedUser) {
            return {
                message: 'User already exists',
                status: 400,
            };
        }

        // create new user
        const userData = await appDataSource
            .getRepository(Users)
            .save(newUser)
            .catch(() => {
                throw new Error('Got an error while creating user: method createUser');
            });

        // return created user data
        return {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            roleId: userData.roleId,
        };
    }
}
