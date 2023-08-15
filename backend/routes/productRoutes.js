import express from 'express';
import { getProductId, getProducts } from '../controllers/productController.js';
const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductId);

export default router;
