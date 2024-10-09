import express from 'express';
import userPermissionCheck from '../middleware/userPermissionCheck';
import {
    addPermissionController,
    getAllPermissionsController,
    removePermissionController,
} from '../controllers/permission.controller';

const router = express.Router();
router.delete('/remove-permission/:id', userPermissionCheck, removePermissionController);
router.post('/add-permission', userPermissionCheck, addPermissionController);
router.get('/get-permissions', userPermissionCheck, getAllPermissionsController);

export default router;
