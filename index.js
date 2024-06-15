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
const allowedOrigins = ['https://flipkart-main1.vercel.app', 'https://flipkart-main1-bv6l.vercel.app'];
app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));


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
