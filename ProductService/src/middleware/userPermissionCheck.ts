import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import STATUS_CODE from '../../../GlobalAccess/constants/status-code';
import { CustomError } from '../../../GlobalAccess/utils/custom-error';

/**
 *
 * @param req request
 * @param res response
 * @param next next function
 * @returns next function or a message if user has no permission to access the route
 * @status 403 Forbidden
 * @status 404 Not Found
 * @status 500 Internal Server Error
 */
const userPermissionCheck = async (req: Request, res: Response, next: NextFunction) => {
    const routePath = req.route.path;
    const userData = JSON.parse(req.headers['x-user'] as string);
    console.log(routePath);

    try {
        // Get route data
        const routeResponse = await axios.get(`${process.env.PROXY_USER_TARGET}/route/get-route?path=${routePath}`, {
            headers: {
                Authorization: req.headers['authorization'],
            },
        });

        if (!routeResponse.data) {
            res.status(STATUS_CODE.NOT_FOUND).json({ message: 'This route not exist in database' });
            return;
        }
        const routePermissions = routeResponse.data[routePath].permissions;

        // check if user has permission to access the route
        if (!userData.role?.permissions?.some((permission: string) => routePermissions.includes(permission))) {
            res.status(STATUS_CODE.FORBIDDEN).json({ message: 'Forbidden' });
            return;
        }
        next();
    } catch (error) {
        const err = error as CustomError;
        console.log('Failed to get route data:', error);
        res.status(err.status).json({ message: 'Fail on verifying Route in ProductService' });
        return;
    }
};

export default userPermissionCheck;
