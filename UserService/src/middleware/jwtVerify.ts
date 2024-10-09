import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import STATUS_CODE from '../../../GlobalAccess/constants/status-code';
import { UserService } from '../services/user.service';
import { convertToNumber } from '../utils/string-format';

/**
 *
 * @param req request
 * @param res response
 * @param next next function
 * @description Verify JWT token and save user data to request if user is authorized
 * @returns next function or a message if user is not authorized
 * @status 401 Unauthorized
 * @status 500 Internal Server Error
 */
const jwtVerify = (req: Request, res: Response, next: NextFunction) => {
    const tokenHeader = req.headers['authorization'] as string;
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    // if no token found
    if (!tokenHeader || !jwtSecretKey) {
        res.status(STATUS_CODE.UNAUTHORIZED).json({ message: 'Invalid Token ' });
        return;
    }

    // verify token
    const token = tokenHeader.split(' ')[1];
    jwt.verify(token, jwtSecretKey, async (err, decoded) => {
        if (err || !decoded) {
            res.status(STATUS_CODE.UNAUTHORIZED).json({ message: 'Got issue while verifying user' });
            console.log(err?.message);
            return;
        }

        // if everything is good, save to request for use in other routes
        const userId = decoded.sub;
        const userService = new UserService();
        const userData = await userService.getUserByID(convertToNumber(userId as string));

        // if user not found
        if (!userData) {
            res.status(STATUS_CODE.UNAUTHORIZED).json({ message: 'Unauthorized' });
            return;
        }

        // save user data to request
        (req as any).user = userData;
        next();
    });
};

export default jwtVerify;
