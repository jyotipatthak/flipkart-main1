import Order from '../models/order.model.js';

const createOrder = async (req, res) => {
  const { items, address, paymentMethod, totalAmount } = req.body;

  try {
    const order = new Order({
      items,
      address,
      paymentMethod,
      totalAmount,
    });

    await order.save();

    res.status(201).send({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(400).send({ message: 'Error placing order', error: error.message });
  }
};

export { createOrder };
