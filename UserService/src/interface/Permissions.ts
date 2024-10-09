interface IPermissionsService {
    getAllPermissions(): Promise<IPermission[] | null>; // Get all permissions
    addPermission(permission: IPermission): Promise<IPermission | null>; // Add a new permission
    removePermission(permissionId: number): Promise<boolean>; // Remove a permission
}

interface IPermission {
    id?: number;
    name: string;
    description: string;
}

export { IPermissionsService, IPermission };
