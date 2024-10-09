import express from 'express';
import { createUserController, getUserByIDController, signInController } from '../controllers/user.controller';
import jwtVerify from '../middleware/jwtVerify';

const router = express.Router();

router.get('/get-user', jwtVerify, getUserByIDController);
router.post('/auth/register', createUserController);
router.post('/auth/sign-in', signInController);

export default router;
