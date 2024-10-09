import { Request, Response } from 'express';
import STATUS_CODE from '../../../GlobalAccess/constants/status-code';
import { RouteService } from '../services/route.service';
import { IRouteBodyData } from '../interface/RouteInterface';

/**
 *
 * @param req request
 * @param res response
 * @returns  all routes with their permissions or a message if no routes are found
 * @status 200 OK
 * @status 404 Not Found
 * @status 500 Internal Server Error
 * @example
 * GET /routes
 * {
 *    "route1": {
 *       "description": "route1 description",
 *      "permissions": ["permission1", "permission2"]
 * },
 */
const getAllRoutesController = async (req: Request, res: Response) => {
    try {
        const routeService = new RouteService();
        const data = await routeService.getAllRoutes();

        if (!data) {
            res.status(STATUS_CODE.NOT_FOUND).json({ message: 'No routes found' });
            return;
        }

        res.status(STATUS_CODE.OK).json(data);
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: (error as Error).message });
    }
};

/**
 *
 * @param req request
 * @param res response
 * @returns  route with their permissions or a message if no route is found
 * @status 200 OK
 * @status 404 Not Found
 * @status 500 Internal Server Error
 * @example
 * GET /route?path=route1
 * {
 *   "route1": {
 *      "description": "route1 description",
 *     "permissions": ["permission1", "permission2"]
 * },
 */
const getRouteByPathController = async (req: Request, res: Response) => {
    const path = req.query.path as string;
    if (!path) {
        res.status(STATUS_CODE.BAD_REQUEST).json({ message: 'Path is required' });
        return;
    }
    try {
        const routeService = new RouteService();
        const data = await routeService.getRouteByPath(path);

        if (!data) {
            res.status(STATUS_CODE.NOT_FOUND).json({ message: 'No route found' });
            return;
        }

        res.status(STATUS_CODE.OK).json(data);
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: (error as Error).message });
    }
};

/**
 *
 * @param req request
 * @param res response
 * @returns  response with added route or error message
 * @status 201 Created
 * @status 400 Bad Request
 * @status 500 Internal Server Error
 * @description Add a new route to the database
 * @example
 * const route = {
 *  path: 'route1',
 *  description: 'route1 description',
 *  method: 'GET',
 *  permissionIds: [1, 2],
 * };
 */
const createRouteController = async (req: Request, res: Response) => {
    const { path, description, permissionIds } = req.body as IRouteBodyData;
    if (!path || !description || !permissionIds) {
        res.status(STATUS_CODE.BAD_REQUEST).json({ message: 'Path, description and permission are required' });
        return;
    }

    if (!Array.isArray(permissionIds)) {
        res.status(STATUS_CODE.BAD_REQUEST).json({ message: 'Permission Ids should be an array' });
        return;
    }
    try {
        const routeService = new RouteService();
        const data = await routeService.createRouteWithPermission(req.body);

        if (!data) {
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: 'Route not created' });
            return;
        }

        res.status(STATUS_CODE.CREATED).json(data);
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: (error as Error).message });
    }
};

/**
 *
 * @param req request
 * @param res response
 * @returns response with message if route is removed successfully or error message
 * @status 200 OK
 * @status 400 Bad Request
 * @status 500 Internal Server Error
 */
const removeRouteController = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!id) {
        res.status(STATUS_CODE.BAD_REQUEST).json({ message: 'Route id is required' });
        return;
    }
    try {
        const routeService = new RouteService();
        const data = await routeService.removeRoute(Number(req.params.id));

        if (!data) {
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: 'Route not deleted' });
            return;
        }

        res.status(STATUS_CODE.OK).json({ message: 'Route deleted' });
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: (error as Error).message });
    }
};
export { getAllRoutesController, getRouteByPathController, createRouteController, removeRouteController };
