import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';
import STATUS_CODE from '../../../GlobalAccess/constants/status-code';
import { convertToNumber } from '../utils/string-format';

/**
 *
 * @param req Request
 * @param res Response
 * @returns return user data by ID or all users if ID is not provided
 * @example /get-user?id=1
 * { id: 1, name: 'John Doe', email: '', role: 'admin' }
 * @status 200 - success
 * @status 400 - if ID is not a number
 * @status 500 - if any error occurs
 */
const getUserByIDController = async (req: Request, res: Response) => {
    const id = req.query.id;
    try {
        const userService = new UserService();
        // if id is not provided
        if (!id) {
            const allUsers = await userService.getAllUsers();

            // if no users found
            if (!allUsers) {
                res.status(STATUS_CODE.NOT_FOUND).json({ message: 'No users found' });
                return;
            }

            // return all users
            res.status(STATUS_CODE.OK).json(allUsers);
            return;
        }

        // convert id to number
        const idFormat = convertToNumber(id as string);
        if (isNaN(idFormat)) {
            res.status(STATUS_CODE.BAD_REQUEST).json({ message: 'User ID must be a number' });
        }

        const userData = await userService.getUserByID(idFormat);
        res.status(STATUS_CODE.OK).json(userData);
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: error });
    }
};

/**
 *
 * @param req Request
 * @param res Response
 * @returns return user data and JWT token
 * @status 200 - success
 * @status 400 - if user ID is not provided or user not found
 * @status 500 - if any error occurs
 * @example /sign-in
 * body: { userId: 1 }
 * data: { user: { id: 1, name: 'John Doe', email: '', role: 'admin' },
 *  token: 'token' }
 */
const signInController = async (req: Request, res: Response) => {
    const { userId } = req.body;
    if (!userId) {
        res.status(STATUS_CODE.BAD_REQUEST).json({ message: 'User ID is required' });
        return;
    }

    try {
        const userService = new UserService();
        const user = await userService.getUserByID(userId);
        // if user not found
        if (!user) {
            res.status(STATUS_CODE.BAD_REQUEST).json({ message: 'User not found' });
            return;
        }

        // generate JWT token
        const secretKey = process.env.JWT_SECRET_KEY;
        const expiredTime = process.env.JWT_EXPIRED_TIME;
        if (!secretKey || !expiredTime) {
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
                message: 'JWT secret key or expired time is not defined',
            });
            return;
        }
        const token = jwt.sign({ sub: userId }, secretKey, {
            expiresIn: convertToNumber(expiredTime),
        });

        // return user data and token
        res.status(STATUS_CODE.OK).json({
            user,
            token,
        });
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
            message: (error as Error).message || 'An unexpected error occurred',
        });
    }
};

export { getUserByIDController, signInController };
