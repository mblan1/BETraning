import { appDataSource } from '../config/typeorm';
import { IPermission, IPermissionsService } from '../interface/Permissions';
import { Permissions } from '../models/Permission.model';

export class PermissionsService implements IPermissionsService {
    /**
     * @returns {Promise<IPermission[] | null>} - Returns all permissions from the database or null if no permissions are found
     */
    async getAllPermissions(): Promise<IPermission[] | null> {
        // Fetch all permissions from the database
        const data = await appDataSource
            .getRepository(Permissions)
            .find()
            .catch(() => {
                throw new Error('Got issue while fetching permissions at getAllPermissions');
            });

        if (!data) {
            return null;
        }

        return data;
    }

    /**
     * @param permission - Permission object
     * @returns {Promise<IPermission | null>}  Returns the added permission or null if the permission is not added
     * @throws {Error} - Throws error if there is an issue while adding permission
     * @description Add a new permission to the database
     * @example
     * const permission = {
     *    name: 'permission name',
     *    description: 'permission description',
     * };
     */
    async addPermission(permission: IPermission): Promise<IPermission | null> {
        // Add a new permission to the database
        permission.name = permission.name.toUpperCase();
        const data = await appDataSource
            .getRepository(Permissions)
            .save(permission)
            .catch(() => {
                throw new Error('Got issue while adding permission at addPermission');
            });

        return data;
    }

    /**
     * @param permissionId - Permission ID
     * @returns {Promise<boolean>} - Returns true if the permission is removed successfully
     */
    async removePermission(permissionId: number): Promise<boolean> {
        // Remove a permission from the database
        const data = await appDataSource
            .getRepository(Permissions)
            .delete(permissionId)
            .catch(() => {
                throw new Error('Got issue while removing permission at removePermission');
            });

        return data.affected !== 0;
    }
}
