import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  // Unique identifier for the product, required field
  id: { type: Number, required: true },
  // Title or name of the product, required field
  title: { type: String, required: true },
  // Price of the product, required field
  price: { type: Number, required: true },
  // Category to which the product belongs, required field
  category: { type: String, required: true },
  // Description of the product, required field
  description: { type: String, required: true },
  // URL or path to the product image, required field
  image: { type: String, required: true },
  // Optional discount percentage for the product, default is 0
  discount: { type: Number, default: 0 },
  // Discounted price of the product after applying discount, required field
  discountedPrice: { type: Number, required: true },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
