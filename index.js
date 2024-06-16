import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import userRouter from './src/routes/user.routes.js';
import orderRouter from './src/routes/order.routes.js';
import categoryRouter from './src/routes/category.routes.js';
import productRouter from './src/routes/product.routes.js';
import cookieParser from 'cookie-parser';
import swaggerDocs from './swagger.js';

dotenv.config(); // Load environment variables

const app = express();

// Connect to MongoDB
connectDB();

// CORS options
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://flipkart-main1.vercel.app/',
   
  ],
  credentials: true, // Allows sending cookies along with the request
  optionsSuccessStatus: 200, // Respond with 200 for preflight CORS requests
};

// Use CORS middleware with options
app.use(cors(corsOptions));

// Other middleware
app.use(express.json()); // Parse JSON bodies in requests
app.use(cookieParser()); // Parse cookies in requests

// Routes
app.use('/api/user', userRouter); // User routes
app.use('/api/orders', orderRouter); // Order routes
app.use('/api/categories', categoryRouter); // Category routes
app.use('/api/products', productRouter); // Product routes

// Swagger documentation setup
swaggerDocs(app);

// Test route
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Job Portal');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
