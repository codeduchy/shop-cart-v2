import path from 'path';
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
import uploadRouter from './routes/uploadRoutes.js';
app.get('/', (req, res) => res.send('API IS RUNNING :)'));
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/order', orderRouter);
app.use('/api/upload', uploadRouter);
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve();
console.log(__dirname);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

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
