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

dotenv.config();

const app = express();

// CORS options
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'https://flipkart-main1.vercel.app',
        'https://flipkart-main1-bv6l.vercel.app'
    ],
    credentials: true, // enable credentials (cookies, authorization headers) cross-origin
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Use CORS middleware with options
app.use(cors(corsOptions));

// Other middleware
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/user', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);

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

