import { ERoles } from '../config/enum';
import { appDataSource } from '../config/typeorm';
import { IMessageResponse } from '../interface/MessageResponse';
import { IUser, IUserService } from '../interface/User';
import { Users } from '../models/User.model';
import { hashString, verifyHash } from '../utils/string-format';

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
                relations: ['role', 'role.roleWithPermission', 'role.roleWithPermission.permission'],
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
                username: user.username,
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
            .catch((err) => {
                console.log(err);
                throw new Error('Got an error while fetching user data: method getUser');
            });
        console.log(userData);
        // check if user not found
        if (!userData) {
            return null;
        }

        // return user data
        return {
            id: userData.id,
            username: userData.username,
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
    async createUser(user: IUser): Promise<any> {
        const newUser = new Users();
        newUser.username = user.username;
        newUser.password = await hashString(user.password);
        newUser.roleId = Number(user.roleId ?? ERoles.USER);

        // check if user already exists
        const existedUser = await appDataSource
            .getRepository(Users)
            .findOne({
                where: {
                    username: newUser.username,
                },
            })
            .catch(() => {
                throw new Error('Got an error while checking user existence: method createUser');
            });

        if (existedUser) {
            throw new Error('User already exists');
        }

        // create new user
        const userData = await appDataSource
            .getRepository(Users)
            .save(newUser)
            .catch((err) => {
                console.error(err);
                throw new Error('Got an error while creating user: method createUser');
            });

        // return created user data
        return {
            message: 'User created successfully',
            id: userData.id,
            username: userData.username,
        };
    }

    async getUserByUsernameAndPassword(username: string, password: string): Promise<any> {
        const userData = await appDataSource.getRepository(Users).findOne({
            where: {
                username: username,
            },
        });

        if (!userData) {
            throw new Error('username is incorrect');
        }

        const hashedPassword = userData.password;
        const isPasswordMatch = await verifyHash(password, hashedPassword);

        if (!isPasswordMatch) {
            throw new Error('password is incorrect');
        }

        return {
            id: userData.id,
            username: userData.username,
            roleId: userData.roleId,
        };
    }
}
