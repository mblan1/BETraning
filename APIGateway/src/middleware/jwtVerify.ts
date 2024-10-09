import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import STATUS_CODE from '../../../GlobalAccess/constants/status-code';
import axios from 'axios';

interface IRequestWithUser extends Request {
    user?: any;
}

const jwtVerify = (req: IRequestWithUser, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    // if no token found
    if (!token || !jwtSecretKey) {
        res.status(STATUS_CODE.UNAUTHORIZED).json({ message: 'Invalid Token' });
        return;
    }

    // verify token
    jwt.verify(token, jwtSecretKey, async (err, decoded) => {
        if (err || !decoded) {
            console.log('err', err?.message);
            res.status(STATUS_CODE.UNAUTHORIZED).json({ message: 'Got issue while verifying token' });
            return;
        }

        // get user data
        const userId = decoded.sub;
        try {
            const userResponse = await axios.get(`${process.env.PROXY_USER_TARGET}/user/get-user?id=${userId}`, {
                headers: {
                    Authorization: req.headers['authorization'],
                },
            });
            if (!userResponse.data) {
                res.status(STATUS_CODE.UNAUTHORIZED).json({ message: 'Unauthorized' });
                return;
            }

            // Add user to request headers before forwarding
            req.headers['x-user'] = JSON.stringify(userResponse.data);
            next();
        } catch (error) {
            console.log('Failed to get user data:', error);
            res.status(STATUS_CODE.UNAUTHORIZED).json({ message: 'Unauthorized' });
            return;
        }
    });
};

export default jwtVerify;
