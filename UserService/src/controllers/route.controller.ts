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
const getRouteController = async (req: Request, res: Response) => {
    const id = req.query.id as string;
    try {
        const routeService = new RouteService();

        // get route with id
        if (id) {
            const routeData = await routeService.getRouteById(Number(id));
            // if route not found
            if (!routeData) {
                res.status(STATUS_CODE.NOT_FOUND).json({ message: 'Route not found' });
                return;
            }

            res.status(STATUS_CODE.OK).json(routeData);
            return;
        }

        // get all routes
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

        res.status(STATUS_CODE.CREATED).json({
            message: 'Route created successfully',
            data: data,
        });
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
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: 'Route not found' });
            return;
        }

        res.status(STATUS_CODE.OK).json({ message: 'Route deleted' });
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: (error as Error).message });
    }
};

const updateRouteController = async (req: Request, res: Response) => {
    const { id, description, permissionIds } = req.body as IRouteBodyData;
    if (!description || !permissionIds || !id) {
        res.status(STATUS_CODE.BAD_REQUEST).json({ message: 'id, description and permissionIds are required' });
        return;
    }

    if (!Array.isArray(permissionIds)) {
        res.status(STATUS_CODE.BAD_REQUEST).json({ message: 'Permission Ids should be an array' });
        return;
    }
    try {
        const routeService = new RouteService();
        const data = await routeService.updateRoute(req.body);

        if (!data) {
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: 'Route not updated' });
            return;
        }

        res.status(STATUS_CODE.CREATED).json({
            message: 'Route updated successfully',
            data: data,
        });
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: (error as Error).message });
    }
};

export { getRouteController, createRouteController, removeRouteController, updateRouteController };
