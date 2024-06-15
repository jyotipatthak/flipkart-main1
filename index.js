import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import userRouter from './src/routes/user.routes.js';
import orderRouter from './src/routes/order.routes.js';
import categoryRouter from './src/routes/category.routes.js'; // Adjust the path if necessary
import productRouter from './src/routes/product.routes.js'; // Adjust the path if necessary
import cookieParser from 'cookie-parser';
import swaggerDocs from './swagger.js';

dotenv.config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Connect DB
connectDB();

// Routes
app.use('/api/user', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);

// Swagger documentation
swaggerDocs(app);

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Job Portal');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
