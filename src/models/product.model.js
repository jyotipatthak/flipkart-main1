import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  discount: { type: Number, default: 0 },
  discountedPrice: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
