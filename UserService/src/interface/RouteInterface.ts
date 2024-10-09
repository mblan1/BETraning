interface IRouteService {
    getAllRoutes(): Promise<IRoutePermission | null>; // Get all routes
    getRouteByPath(path: string): Promise<IRoutePermission | null>; // Get route by path
    removeRoute(routeId: number): Promise<boolean>; // Remove a route by ID
    createRouteWithPermission(route: IRouteBodyData): Promise<IRoutePermission | null>; // Create a new route
}

interface IRoute {
    id: number;
    name: string;
    description: string;
    method: string;
}

interface IRoutePermission {
    [route: string]: {
        id?: number;
        description: string;
        permissions: string[];
    };
}

interface IRouteBodyData {
    path: string;
    description: string;
    method: string;
    permissionIds: number[];
}

export { IRouteService, IRoute, IRoutePermission, IRouteBodyData };
