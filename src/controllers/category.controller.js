import Category from '../models/category.model.js';
import fetch from 'node-fetch';

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns 
 */
export const getCategories = async (req, res) => {
  try {
    let categories = await Category.find();

    if (categories.length === 0) {
      // Fetch categories from the external API
      const response = await fetch('https://fakestoreapi.com/products/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories from external API');
      }
      const externalCategories = await response.json();

      // Save the categories to the local database
      categories = await Category.insertMany(
        externalCategories.map(name => ({ name }))
      );
    }

    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: error.message });
  }
};
