import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  // Name of the category, which is required and unique
  name: { type: String, required: true, unique: true },
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
