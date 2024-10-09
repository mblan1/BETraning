import { appDataSource } from '../config/typeorm';
import { IRouteBodyData, IRoutePermission, IRouteService } from '../interface/RouteInterface';
import { Permissions } from '../models/Permission.model';
import { Routes } from '../models/Route.model';
import { RouteWithPermission } from '../models/RouteWithPermission';

export class RouteService implements IRouteService {
    /**
     *
     * @returns all routes with their permissions from database or null if no routes found
     */
    async getAllRoutes(): Promise<IRoutePermission | null> {
        const data = await appDataSource
            .getRepository(Routes)
            .find({
                relations: ['routeWithPermissions', 'routeWithPermissions.permission'],
            })
            .catch((error) => {
                console.log(error);
                throw new Error('Got issue while fetching routes at getAllRoutes');
            });

        // check if no routes found
        if (!data) {
            return null;
        }
        // reduce the data to get the required format
        const modifiedData = data.reduce((acc: IRoutePermission, route) => {
            const permissions = route.routeWithPermissions.map((routeWithPermission) => {
                return routeWithPermission.permission.name;
            });
            acc[route.name] = {
                id: route.id,
                description: route.description,
                permissions: permissions,
            };
            return acc;
        }, {});

        return modifiedData;
    }

    /**
     * @param path route path
     * @returns route with their permissions from database or null if no route found
     */
    async getRouteByPath(path: string): Promise<IRoutePermission | null> {
        const data = await appDataSource
            .getRepository(RouteWithPermission)
            .findOne({
                where: {
                    route: {
                        name: path,
                    },
                },
                relations: ['permission', 'route'],
            })
            .catch(() => {
                throw new Error('Got issue while fetching routes at getRouteByPath');
            });

        if (!data) {
            return null;
        }

        const { name, description } = data.route;
        return {
            [name]: {
                description: description,
                permissions: [data.permission.name],
            },
        };
    }

    /**
     *
     * @param route route data
     * @returns  all routes with their permissions from database or null if no routes found
     * @throws {Error} - Throws error if there is an issue while creating route
     * @example
     * const route = {
     *  path: 'route1',
     *  description: 'route1 description',
     *  method: 'GET',
     *  permissionIds: [1, 2],
     * };
     */
    async createRouteWithPermission(route: IRouteBodyData): Promise<IRoutePermission | null> {
        const permissionArray: string[] = [];

        const routeData = {
            name: route.path,
            description: route.description,
            method: route.method,
        };

        // check if route already exists
        const existingRoute = await appDataSource.getRepository(Routes).findOne({
            where: {
                name: routeData.name,
            },
        });
        if (existingRoute) {
            throw new Error('Route already exists');
        }

        // get all permissions
        const permissions = await appDataSource.getRepository(Permissions).find();
        if (permissions.length === 0) {
            throw new Error('No permissions found');
        }

        // check if permission ids are valid
        for (const permissionId of route.permissionIds) {
            const permission = permissions.find((p) => p.id === permissionId);
            if (!permission) {
                throw new Error(`Permission with ID ${permissionId} not found`);
            }
        }

        // create route
        const newRoute = await appDataSource.getRepository(Routes).save(routeData);
        if (!newRoute) {
            throw new Error('Got issue while creating route');
        }

        // Check for permissions
        if (route.permissionIds.length > 0) {
            for (const permissionId of route.permissionIds) {
                const permission = await appDataSource.getRepository(Permissions).findOne({
                    where: { id: permissionId },
                });

                // check if permission not found
                if (!permission) {
                    throw new Error(`Permission with ID ${permissionId} not found`);
                }

                // create the route with permission mapping
                const routeWithPermission = {
                    routeId: newRoute.id,
                    permissionId: permission.id,
                };

                // add permission name to permission array
                permissionArray.push(permission.name);

                const newRouteWithPermission = await appDataSource
                    .getRepository(RouteWithPermission)
                    .save(routeWithPermission);

                // check if create not successful
                if (!newRouteWithPermission) {
                    throw new Error('Got issue while creating route with permission');
                }
            }
        }

        return {
            [newRoute.name]: {
                description: newRoute.description,
                permissions: permissionArray,
            },
        };
    }

    /**
     * @param routeId route id
     * @returns true if route is deleted successfully else false
     */
    async removeRoute(routeId: number): Promise<boolean> {
        const route = await appDataSource.getRepository(Routes).findOne({
            where: {
                id: routeId,
            },
        });
        if (!route) {
            return false;
        }

        // remove route with permissions
        const routeWithPermission = await appDataSource.getRepository(RouteWithPermission).find({
            where: {
                routeId: route.id,
            },
        });
        if (routeWithPermission.length > 0) {
            await appDataSource.getRepository(RouteWithPermission).delete({
                routeId: route.id,
            });
        }

        // remove route
        const data = await appDataSource
            .getRepository(Routes)
            .delete({
                id: route.id,
            })
            .catch((err) => {
                console.log(err);
                throw new Error('Got issue while deleting route');
            });

        return data.affected !== 0;
    }
}
