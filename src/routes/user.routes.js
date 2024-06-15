// src/routes/user.routes.js

import express from "express";
import { login, register, logout, deleteUser } from "../controllers/user.controller.js";
import { authentication } from "../middlewares/user.middleware.js"; 

const userRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         name: John Doe
 *         email: john.doe@example.com
 *         password: password123
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The user was successfully registered
 *       500:
 *         description: Some server error
 */
userRouter.post("/register", register);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: The user was successfully logged in
 *       500:
 *         description: Some server error
 */
userRouter.post("/login", login);

/**
 * @swagger
 * /user/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The user was successfully logged out
 *       500:
 *         description: Some server error
 */
userRouter.post("/logout", logout);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user was successfully deleted
 *       500:
 *         description: Some server error
 */
userRouter.delete("/:id", authentication, deleteUser);

export default userRouter;
