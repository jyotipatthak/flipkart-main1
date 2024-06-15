// src/routes/order.routes.js

import express from 'express';
import { createOrder } from '../controllers/order.controller.js'; // Import the missing functions

const orderRouter = express.Router();

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                     quantity:
 *                       type: number
 *               address:
 *                 type: object
 *                 properties:
 *                   addressLine:
 *                     type: string
 *                   pincode:
 *                     type: number
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *               paymentMethod:
 *                 type: string
 *               totalAmount:
 *                 type: number
 *             required:
 *               - items
 *               - address
 *               - paymentMethod
 *               - totalAmount
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request
 */
orderRouter.post("/", createOrder);



export default orderRouter;
