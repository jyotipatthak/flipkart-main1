import express from 'express';
import { createOrder } from '../controllers/order.controller.js'; // Import the missing functions

const orderRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         addressLine:
 *           type: string
 *         pincode:
 *           type: number
 *         city:
 *           type: string
 *         state:
 *           type: string
 *       required:
 *         - addressLine
 *         - pincode
 *         - city
 *         - state
 *     Item:
 *       type: object
 *       properties:
 *         product:
 *           type: string
 *         quantity:
 *           type: number
 *       required:
 *         - product
 *         - quantity
 *     Order:
 *       type: object
 *       properties:
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Item'
 *         address:
 *           $ref: '#/components/schemas/Address'
 *         paymentMethod:
 *           type: string
 *         totalAmount:
 *           type: number
 *       required:
 *         - items
 *         - address
 *         - paymentMethod
 *         - totalAmount
 */

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
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request
 */
orderRouter.post("/", createOrder);

export default orderRouter;
