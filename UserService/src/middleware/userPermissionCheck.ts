import { Request, Response, NextFunction } from 'express';
import { RouteService } from '../services/route.service';
import STATUS_CODE from '../../../GlobalAccess/constants/status-code';
import { IUser } from '../interface/User';

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
    const userData = (req as any).user as IUser;
    const routeService = new RouteService();
    console.log(routePath);

    // Get route data
    const routeData = await routeService.getRouteByPath(routePath);
    if (!routeData) {
        res.status(STATUS_CODE.NOT_FOUND).json({ message: `${routePath} is not exist in database` });
        return;
    }
    // get permissions of route and user
    const routePermissions = routeData[routePath].permissions;
    const userPermissions = userData.role?.permissions;

    // check if user has permission to access the route
    if (!userPermissions?.some((permission) => routePermissions.includes(permission))) {
        res.status(STATUS_CODE.FORBIDDEN).json({ message: 'Forbidden' });
        return;
    }

    next();
};

export default userPermissionCheck;
