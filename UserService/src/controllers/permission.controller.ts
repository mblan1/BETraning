import { Request, Response } from 'express';

import STATUS_CODE from '../../../GlobalAccess/constants/status-code';
import { PermissionsService } from '../services/permission.service';

const getAllPermissionsController = async (req: Request, res: Response) => {
    try {
        const permissionsService = new PermissionsService();
        const permissions = await permissionsService.getAllPermissions();
        if (!permissions) {
            res.status(STATUS_CODE.NOT_FOUND).json({ message: 'No permissions found' });
            return;
        }
        res.status(STATUS_CODE.OK).json(permissions);
    } catch (error) {
        console.error(error);
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: (error as Error).message });
    }
};

/**
 *
 * @param req request
 * @param res response
 * @returns  response with added permission or error message
 * @status 201 Created
 * @status 400 Bad Request
 * @status 500 Internal Server Error
 * @description Add a new permission to the database
 * @example
 * const permission = {
 *   name: 'permission name',
 *  description: 'permission description',
 * };
 * @throws {Error} - Throws error if there is an issue while adding permission
 */
const addPermissionController = async (req: Request, res: Response) => {
    const permission = req.body;
    if (!permission.name || !permission.description) {
        res.status(STATUS_CODE.BAD_REQUEST).json({ message: 'Permission name and description are required' });
        return;
    }

    try {
        const permissionsService = new PermissionsService();
        const newPermission = await permissionsService.addPermission(permission);
        if (!newPermission) {
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: 'Permission not added' });
            return;
        }
        res.status(STATUS_CODE.CREATED).json(newPermission);
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: (error as Error).message });
    }
};

/**
 *
 * @param req request
 * @param res response
 * @returns response with message if permission is removed successfully or error message
 * @status 200 OK
 * @status 400 Bad Request
 * @status 500 Internal Server Error
 * @description Remove a permission from the database
 */
const removePermissionController = async (req: Request, res: Response) => {
    const permissionId = Number(req.params.id);
    if (!permissionId) {
        res.status(STATUS_CODE.BAD_REQUEST).json({ message: 'Permission ID is required' });
        return;
    }
    try {
        const permissionsService = new PermissionsService();
        const isRemoved = await permissionsService.removePermission(permissionId);
        if (!isRemoved) {
            res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: 'Permission not removed' });
            return;
        }
        res.status(STATUS_CODE.OK).json({ message: 'Permission removed successfully' });
    } catch (error) {
        res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({ message: (error as Error).message });
    }
};

export { getAllPermissionsController, addPermissionController, removePermissionController };
