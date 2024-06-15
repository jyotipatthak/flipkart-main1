import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
  // Array of items in the order
  items: [
    {
      product: {
        type: String, 
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  // Shipping address details
  address: {
    addressLine: { type: String, required: true },
    pincode: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  // Payment method used for the order
  paymentMethod: { type: String, required: true },
  // Total amount of the order
  totalAmount: { type: Number, required: true }, 
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
