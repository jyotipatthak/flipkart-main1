import Order from '../models/order.model.js';

/**
 * Creates a new order based on the request body data.
 * 
 * @param {import("express").Request} req - Express request object containing order details in req.body
 * @param {import("express").Response} res - Express response object to send the response
 */
const createOrder = async (req, res) => {
  const { items, address, paymentMethod, totalAmount } = req.body;

  try {
    // Create a new Order instance with provided data
    const order = new Order({
      items,
      address,
      paymentMethod,
      totalAmount,
    });

    // Save the order to the database
    await order.save();

    // Respond with a success message and the created order
    res.status(201).send({ message: 'Order placed successfully', order });
  } catch (error) {
    // Handle any errors that occur during order creation
    res.status(400).send({ message: 'Error placing order', error: error.message });
  }
};

export { createOrder };
