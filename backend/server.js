import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import products from './data/products.js';
import connectDB from './config/db.js';
import { notFound } from './middleware/errorMiddleware.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';

const app = express();

//ENTRY MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//ROUTES
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
app.get('/', (req, res) => res.send('API IS RUNNING :)'));
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

//NOT FOUND
app.use(notFound);

//ERROR MIDDLEWARE
app.use(errorHandler);

//SERVER AND DB
const port = process.env.PORT || 5000;
try {
  connectDB();
  app.listen(port, () => console.log(`SERVER IS RUNNING ON PORT: ${port}`));
} catch (error) {
  console.log(error);
  process.exit(1);
}
