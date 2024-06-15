// src/routes/product.routes.js

import express from 'express';
import { getAllProducts, getProductsByCategory } from '../controllers/product.controller.js';

const productRouter = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 */
productRouter.get('/', getAllProducts);

/**
 * @swagger
 * /products/category/{category}:
 *   get:
 *     summary: Get products by category
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: The product category
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *       404:
 *         description: Category not found
 */
productRouter.get('/category/:category', getProductsByCategory);

export default productRouter;
