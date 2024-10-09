import express from 'express';
import {
    createRouteController,
    getAllRoutesController,
    getRouteByPathController,
    removeRouteController,
} from '../controllers/route.controller';
import userPermissionCheck from '../middleware/userPermissionCheck';

const router = express.Router();

router.delete('/remove-route/:id', userPermissionCheck, removeRouteController);
router.post('/create-route', userPermissionCheck, createRouteController);
router.get('/get-route', userPermissionCheck, getRouteByPathController);
router.get('/get-routes', getAllRoutesController);

export default router;
