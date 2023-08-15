import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import products from './data/products.js';
import connectDB from './config/db.js';
import productRouter from './routes/productRoutes.js';
import { notFound } from './middleware/errorMiddleware.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();

//ENTRY MIDDLEWARE

//ROUTES
app.get('/', (req, res) => res.send('API IS RUNNING :)'));
app.use('/api/products', productRouter);

//NOT FOUND
app.use(notFound);

//ERROR MIDDLEWARE
app.use(errorHandler);

//SERVER AND DB
const port = process.env.PORT || 5000;
try {
  await connectDB();
  app.listen(port, () => console.log(`SERVER IS RUNNING ON PORT: ${port}`));
} catch (error) {
  console.log(error);
  process.exit(1);
}
