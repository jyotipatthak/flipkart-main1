// src/routes/category.routes.js

import express from "express";
import { getCategories } from "../controllers/category.controller.js";

const categoryRouter = express.Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 */
categoryRouter.get("/", getCategories);

export default categoryRouter;
