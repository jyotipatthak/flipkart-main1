import Category from '../models/category.model.js';
import fetch from 'node-fetch';

/**
 * Fetches categories from the local database. If no categories are found,
 * fetches categories from an external API and saves them to the local database.
 * 
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 */
export const getCategories = async (req, res) => {
  try {
    let categories = await Category.find();

    // If no categories are found in the local database
    if (categories.length === 0) {
      // Fetch categories from the external API
      const response = await fetch('https://fakestoreapi.com/products/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories from external API');
      }
      const externalCategories = await response.json();

      // Save the fetched categories to the local database
      categories = await Category.insertMany(
        externalCategories.map(name => ({ name }))
      );
    }

    // Respond with the categories
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: error.message });
  }
};
