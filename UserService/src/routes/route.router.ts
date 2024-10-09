import express from 'express';
import {
    createRouteController,
    getRouteController,
    removeRouteController,
    updateRouteController,
} from '../controllers/route.controller';
import userPermissionCheck from '../middleware/userPermissionCheck';

const router = express.Router();
router.delete('/remove-route/:id', userPermissionCheck, removeRouteController);
router.put('/update-route', userPermissionCheck, updateRouteController);
router.post('/create-route', userPermissionCheck, createRouteController);
router.get('/get-route', userPermissionCheck, getRouteController);

export default router;
