import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db.js';
import { notFound } from './middleware/errorMiddleware.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import uploadRouter from './routes/uploadRoutes.js';

const app = express();
const __dirname = path.resolve();

//ENTRY MIDDLEWARE
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//ROUTES
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/order', orderRouter);
app.use('/api/upload', uploadRouter);
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

if (process.env.NODE_ENV === 'production') {
  // set react build static folder
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  //redirect any route that`s not api to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => res.send('API IS RUNNING :)'));
}

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
