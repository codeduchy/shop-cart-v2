import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import productRouter from './routes/productRoutes.js';
import usersRouter from './routes/userRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// SETUP
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// ENTRY MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api/products', productRouter);
app.use('/api/users', usersRouter);

//NOT FOUND
app.use(notFound);
app.use(errorHandler);

// SERVER AND DB
connectDB();
app.listen(port, console.log(`SERVER PORT: ${port}`));
