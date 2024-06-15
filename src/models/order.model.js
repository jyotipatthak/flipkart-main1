import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
  items: [
    {
      product: {
        type: String, // Change the type to String to store product names
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  address: {
    addressLine: { type: String, required: true },
    pincode: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true },
  totalAmount: { type: Number, required: true }, // Ensure totalAmount is required
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
