import express from 'express';
import { getProductByID } from '../controllers/productDetail';

const router = express.Router();

// GET /product/:id
/**
 * @openapi
 * /product/{id}:
 *   get:
 *     tags:
 *       - Product Detail
 *     summary: Get product by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ProductDetail'
 *       400:
 *         description: Product ID is required
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/:id', getProductByID);

export default router;
