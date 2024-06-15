import Product from '../models/product.model.js';
import fetch from 'node-fetch';

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @returns 
 */
const getAllProducts = async (req, res) => {
  try {
    let products = await Product.find();

    if (products.length === 0) {
      // Fetch products from the external API
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        console.error(`Failed to fetch products: ${response.status} - ${response.statusText}`);
        throw new Error('Failed to fetch products from external API');
      }
      const externalProducts = await response.json();

      // Calculate discountedPrice and apply discount before saving to the database
      const productsWithDiscounts = externalProducts.map(product => {
        const discount = Math.floor(Math.random() * 21); // 0% to 20%
        const discountedPrice = product.price - (product.price * (discount / 100));
        return {
          id:product.id,
          ...product,
          discount,
          discountedPrice
        };
      });

      // Save the products to the local database
      products = await Product.insertMany(productsWithDiscounts);
    }

    res.json(products);
  } catch (err) {
    console.error(`Error getting all products: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    let products = await Product.find({ category: req.params.category });

    if (products.length === 0) {
      // Fetch products from the external API
      const response = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(req.params.category)}`);
      if (!response.ok) {
        console.error(`Failed to fetch products by category: ${response.status} - ${response.statusText}`);
        throw new Error('Failed to fetch products from external API');
      }
      const externalProducts = await response.json();

      // Calculate discountedPrice and apply discount before saving to the database
      const productsWithDiscounts = externalProducts.map(product => {
        const discount = Math.floor(Math.random() * 21); // 0% to 20%
        const discountedPrice = product.price - (product.price * (discount / 100));
        return {
          ...product,
          discount,
          discountedPrice
        };
      });

      // Save the products to the local database
      products = await Product.insertMany(productsWithDiscounts);
    }

    res.json(products);
  } catch (err) {
    console.error(`Error getting products by category: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
};

export { getAllProducts, getProductsByCategory };
