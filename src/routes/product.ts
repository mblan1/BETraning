import express from 'express';
import { getProductByID } from '../controllers/productDetail';

const router = express.Router();

router.get('/:id', getProductByID);

export default router;
