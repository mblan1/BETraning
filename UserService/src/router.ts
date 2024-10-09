import { EPermissions } from './config/enum';

const UserRoutes = {
    ROOT: {
        path: '/',
        permissions: [],
    },
    GET_PERMISSIONS: {
        path: '/get-permissions',
        method: 'GET',
        permissions: [EPermissions.MANAGE_ROLE],
    },
};

export default UserRoutes;
