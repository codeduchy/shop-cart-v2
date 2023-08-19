mkdir proshop
cd proshop.......

## Setup

:npx create-react-app frontend
:cd frontend
:npm start

delete app.css/logo.svg and App.test.js // Boilerplate cleanup
in frontend :rm -rf .git
in root :git init...
move gitingore to root / add .env

## Frontend start

copy assets and images folder
./assets/styles
./public/images
./assets/logo.png
./products.js

:npm i react-bootstrap bootstrap react-icons
./index.js = import 'bootstrap/dist/css/bootstrap.min.css/'
:npm i react-router-dom
:npm i react-router-bootstrap

### ./components/Header.jsx

import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
return (

<header>
<Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
<Container>
<LinkContainer to="/">
<Navbar.Brand style={{ display: 'flex' }}>
<img src={logo}></img>
ShopCart
</Navbar.Brand>
</LinkContainer>
<Navbar.Collapse id="basic-navbar-nav">
<Nav className="ms-auto">
<LinkContainer to="/cart">
<Nav.Link>
<FaShoppingCart /> Cart
</Nav.Link>
</LinkContainer>
<LinkContainer to="/login">
<Nav.Link>
<FaShoppingCart /> Sign In
</Nav.Link>
</LinkContainer>
</Nav>
</Navbar.Collapse>
</Container>
</Navbar>
</header>
);
};
export default Header;

### ./components/Footer.jsx

import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
const currentYear = new Date().getFullYear();

return (

<footer>
<Container>
<Row>
<Col className="text-center py-3">
<p>ShopCart &copy; {currentYear}</p>
</Col>
</Row>
</Container>
</footer>
);
};
export default Footer;

### .components/Rating.jsx

import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text }) => {
return (

<div className="rating">
<span>
{value >= 1 ? (
<FaStar />
) : value >= 0.5 ? (
<FaStarHalfAlt />
) : (
<FaRegStar />
)}
</span>
<span>
{value >= 2 ? (
<FaStar />
) : value >= 1.5 ? (
<FaStarHalfAlt />
) : (
<FaRegStar />
)}
</span>
<span>
{value >= 3 ? (
<FaStar />
) : value >= 2.5 ? (
<FaStarHalfAlt />
) : (
<FaRegStar />
)}
</span>
<span>
{value >= 4 ? (
<FaStar />
) : value >= 3.5 ? (
<FaStarHalfAlt />
) : (
<FaRegStar />
)}
</span>
<span>
{value >= 5 ? (
<FaStar />
) : value >= 4.5 ? (
<FaStarHalfAlt />
) : (
<FaRegStar />
)}
</span>
<span className="rating-text">{text && text}</span>
</div>
);
};
export default Rating;

### ./components/Product.jsx

import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
return (
<Card className="my-3 p-3 rounded">

<Link to={`/products/${product._id}`}>
<Card.Img src={product.image} variant="top" alt="pic" />
</Link>
<Card.Body>
<Link to={`/product/${product._id}`}>
<Card.Title as="div" className="product-title">
<strong>{product.name}</strong>
</Card.Title>
</Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>

);
};
export default Product;

### ./screens/HomeScreen.jsx

import { Row, Col } from 'react-bootstrap';
import products from '../products';
import Product from '../components/Product';
const HomeScreen = () => {
return (
<>

<h1>Latest Products</h1>
<Row>
{products.map((product) => {
return (
<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
<Product product={product} />
</Col>
);
})}
</Row>
</>
);
};
export default HomeScreen;

### ./ProductScreen.jsx

import { useParams } from 'react-router-dom';
import products from '../products';
import { Link } from 'react-router-dom';
import {
Row,
Col,
Image,
ListGroup,
Card,
Button,
ListGroupItem,
} from 'react-bootstrap';
import Rating from '../components/Rating';

const ProductScreen = () => {
const { id: productId } = useParams();
const product = products.find((p) => p.\_id === productId);
return (
<>

<Link className="btn btn-light my-3" to="/">
Go Back
</Link>
<Row>
<Col md={5}>
<Image src={`../${product.image}`} alt={product.name} fluid />
</Col>
<Col md={4}>
<ListGroup variant="flush">
<ListGroup.Item>
<h3>{product.name}</h3>
</ListGroup.Item>
<ListGroup.Item>
<Rating
value={product.rating}
text={`${product.numReviews} reviews`} ></Rating>
</ListGroup.Item>
<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
</Col>
</Row>
</ListGroup.Item>
<ListGroup.Item>
<Row>
<Col>Status:</Col>
<Col>
<strong>
${product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
</strong>
</Col>
</Row>
</ListGroup.Item>

              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  AddToCart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>

);
};
export default ProductScreen;

### App.jx

import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
const App = () => {
return (
<>

<Header />
<main className="py-3">
<Container>
<Outlet />
</Container>
</main>
<Footer />
</>
);
};
export default App;

### index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
createBrowserRouter,
createRoutesFromElements,
Route,
RouterProvider,
} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

const router = createBrowserRouter(
createRoutesFromElements(
<Route path="/" element={<App />}>
<Route index={true} path="/" element={<HomeScreen />} />
<Route path="/products/:id" element={<ProductScreen />} />
</Route>
)
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);

reportWebVitals();

## Backend start

./frontend/package.json = "proxy": "http://localhost:5000" && :npm i axios

### root folder

:npm init
:npm i express
:npm i concurrently dotenv nodemon

./package.json
"type": "module",
"scripts": {
"start": "node backend/server.js",
"server": "nodemon backend/server.js",
"client": "npm start --prefix frontend",
"dev": "concurrently \"npm run server\" \"npm run client\""
},

./.env
PORT=5000
NODE_ENV=development

### ./backend

move products.js to ./data/products.js
setup ./server.js

### ./server.js

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import products from './data/products.js';

const app = express();
// ENTRY MIDDLEWARE

// ROUTES
app.get('/', (req, res) => {
res.send('API is running...');
});
app.get('/api/products', (req, res) => {
res.json(products);
});
app.get('/api/products/:id', (req, res) => {
const product = products.find((p) => p.\_id === req.params.id);
res.json(product);
});

const port = process.env.PORT || 5000;
app.listen(port, console.log(`PORT: ${port}`));

## Frontend

### ./screens/Homescreen.jsx

...
import { useEffect, useState } from 'react';
import axios from 'axios';

const HomeScreen = () => {
const [products, setProducts] = useState([]);

useEffect(() => {
const fetchProducts = async () => {
const { data } = await axios.get('/api/products');
setProducts(data);
};
fetchProducts();
}, []);
...

### ./screens/ProductScreen.jsx

...
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductScreen = () => {
const { id: productId } = useParams();
const [product, setProduct] = useState({});

useEffect(() => {
const fetchProduct = async () => {
const { data } = await axios.get(`/api/products/${productId}`);
setProduct(data);
};
fetchProduct();
}, [productId]);
...

## Backend MongoDB setup ++

MongoDB compass
:npm i mongoose
:npm i bcryptjs
:npm i colors

### ./.env

PORT=5000
NODE_ENV=development
MONGO_URL=ADD_YOUR_MONGO_DB_URI

### ./config/db.js

import mongoose from 'mongoose';

const connectDB = async () => {
try {
const conn = await mongoose.connect(process.env.MONGO_URI);
console.log(`MongoDB Connected: ${conn.connection.host}`);
} catch (error) {
console.log(`Error: ${error.message}`);
process.exit(1);
}
};

export default connectDB;

### ./models/userModel.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
{
name: {
type: String,
required: true,
},
email: {
type: String,
required: true,
unique: true,
},
name: {
type: String,
required: true,
},
isAdmin: {
type: Boolean,
required: true,
default: false,
},
},
{
timestamps: true,
}
);

const User = mongoose.model('User', userSchema);
export default User;

### ./models/orderModel.js

import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
{
user: {
type: mongoose.Types.ObjectId,
required: true,
ref: 'User',
},
orderItems: [
{
name: { type: String, required: true },
qty: { type: Number, required: true },
image: { type: String, required: true },
price: { type: Number, required: true },
product: {
type: mongoose.Types.ObjectId,
required: true,
ref: 'Product',
},
},
],
shippingAddress: {
address: { type: String, required: true },
city: { type: String, required: true },
postalCode: { type: String, required: true },
country: { type: String, required: true },
},
paymentMethod: {
type: String,
required: true,
},
paymentResult: {
id: { type: String },
status: { type: String },
update_time: { type: String },
email_address: { type: String },
},
itemsPrice: {
type: Number,
required: true,
default: 0.0,
},
taxPrice: {
type: Number,
required: true,
default: 0.0,
},
shippingPrice: {
type: Number,
required: true,
default: 0.0,
},
totalPrice: {
type: Number,
required: true,
default: 0.0,
},
isPaid: {
type: Boolean,
required: true,
default: false,
},
paidAt: {
type: Date,
},
isDelivered: {
type: Boolean,
required: true,
default: false,
},
deliveredAt: {
type: Date,
},
},
{
timestamps: true,
}
);

const Order = mongoose.model('Order', orderSchema);
export default Order;

### ./controllers/productModles.js

import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
{
user: {
type: mongoose.Types.ObjectId,
required: true,
ref: 'User',
},
name: {
type: String,
required: true,
},
rating: {
type: Number,
required: true,
},
comment: {
type: String,
required: true,
},
},
{ timestamps: true }
);

const productSchema = new mongoose.Schema(
{
user: {
type: mongoose.Types.ObjectId,
required: true,
ref: 'User',
},
name: {
type: String,
required: true,
},
image: {
type: String,
required: true,
},
brand: {
type: String,
required: true,
},
category: {
type: String,
required: true,
},
description: {
type: String,
required: true,
},
reviews: [reviewSchema],
rating: {
type: Number,
required: true,
default: 0,
},
numReviews: {
type: Number,
required: true,
default: 0,
},
price: {
type: Number,
required: true,
},
countInStock: {
type: Number,
required: true,
default: 0,
},
},
{
timestamps: true,
}
);

const Product = mongoose.model('Product', productSchema);
export default Product;

### ./data/users.js

import bcrypt from 'bcryptjs';

const users = [
{
name: 'Admin User',
email: 'admin@email.com',
password: bcrypt.hashSync('123456', 10),
isAdmin: true,
},
{
name: 'John Doe',
email: 'john@email.com',
password: bcrypt.hashSync('123456', 10),
isAdmin: false,
},
{
name: 'Jane Doe',
email: 'jane@email.com',
password: bcrypt.hashSync('123456', 10),
isAdmin: false,
},
];

export default users;

### ./data/products.js

delete \_id fields

### ./middleware/asyncHandler.js

const asyncHandler = (fn) => (req, res, next) => {
Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;

### ./middleware/errorMiddleware.js

const notFound = (req, res, next) => {
const error = new Error(`Not Found - ${req.originalUrl}`);
res.status(404);
next(error);
};

const errorHandler = (err, req, res, next) => {
let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
let message = err.message;

if (err.name === 'CastError' && err.kind === 'ObjectId') {
message = `Resource not found`;
statusCode = 404;
}

res.status(statusCode).json({
message,
stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
});
};

export { notFound, errorHandler };

### ./controllers/productController.js

import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc Fetch all products
// @desc GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
const products = await Product.find({});
res.json(products);
});

// @desc Fetch a products
// @desc GET /api/products/:id
// @access Public
const getProductId = asyncHandler(async (req, res) => {
const product = await Product.findById(req.params.id);

if (product) {
return res.json(product);
} else {
res.status(404);
throw new Error('Product not found');
}
});

export { getProducts, getProductId };

### ./routes/productRoutes.js

import express from 'express';
import { getProductId, getProducts } from '../controllers/productController.js';
const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductId);

export default router;

### ./seeder.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
try {
await Order.deleteMany();
await Product.deleteMany();
await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();

} catch (error) {
console.error(`${error}`.red.inverse);
process.exit(1);
}
};

const destroyData = async () => {
try {
await Order.deleteMany();
await Product.deleteMany();
await User.deleteMany();

    console.log('Data Destroyed!'.green.inverse);
    process.exit();

} catch (error) {
console.error(`${error}`.red.inverse);
process.exit(1);
}
};

if (process.argv[2] === '-d') {
destroyData();
} else {
importData();
}

### ./package.json

    "data:import": "node backend/seeder.js",
    "data:destroy": "node backend/seeder.js -d"

### ./server.js

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db.js';

const app = express();
// ENTRY MIDDLEWARE

// ROUTES
import productRouter from './routes/productRoutes.js';
app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/products', productRouter);

//NOT FOUND AND ERROR HANDLER MIDDLEWARE
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
app.use(notFound);
app.use(errorHandler);

// SERVER AND DB
const port = process.env.PORT || 5000;
connectDB();
app.listen(port, console.log(`PORT: ${port}`));

## Redux Toolkit setup ./Frontend/src

:npm i @reduxjs/toolkit react-redux

### ./constants.js

// export const BASE_URL =
// process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';
export const BASE_URL = '/';
export const PRODUCTS_URL = 'api/products';
export const USERS_URL = 'api/users';
export const ORDERS_URL = 'api/orders';
export const PAYPAL_URL = 'api/config/paypal';

### ./store.js

import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
reducer: {
[apiSlice.reducerPath]: apiSlice.reducer,
},
middleware: (getDefaultMiddleware) =>
getDefaultMiddleware().concat(apiSlice.middleware),
devTools: true,
});

export default store;

### ./index.js

import { Provider } from 'react-redux';
import store from './store';
...
root.render(
<Provider store={store}>
<RouterProvider router={router} />
</Provider>
);
...

### ./slices/apiSlice.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';
const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
baseQuery,
tagTypes: ['Product', 'Order', 'User'],
endpoints: (builder) => ({}),
});

### ./slices/productsApiSlice.js

import { PRODUCTS_URL } from '../constants';
import { apiSlice } from './apiSlice';

console.log(PRODUCTS_URL);

export const productsApiSlice = apiSlice.injectEndpoints({
endpoints: (builder) => ({
getProducts: builder.query({
query: () => ({
url: PRODUCTS_URL,
}),
keepUnusedDataFor: 5,
}),
getProductDetails: builder.query({
query: (productId) => ({
url: `${PRODUCTS_URL}/${productId}`,
}),
keepUnusedDataFor: 5,
}),
}),
});

export const { useGetProductsQuery } = productsApiSlice;
export const { useGetProductDetailsQuery } = productsApiSlice;

### ./components/Loader.jsx

import { Spinner } from 'react-bootstrap';

const Loader = () => {
return (
<Spinner
animation="border"
role="status"
style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }} ></Spinner>
);
};

export default Loader;

### ./components/Message.jsx

import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
variant: 'info',
};

export default Message;

### ./screens/HomeScreen.jsx

...
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const HomeScreen = () => {
const { data: products, isLoading, error } = useGetProductsQuery();

return (
<>
{isLoading ? (
<Loader />
) : error ? (
<Message variant="danger">
{error?.data?.message || error.error}
</Message>
) : (
<>

<h1>Latest Products</h1>
<Row>
{products.map((product) => {
return (
<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
<Product product={product} />
</Col>
);
})}
</Row>
</>
)}
</>
);
};
export default HomeScreen;

### ./components/ProductScreen.jsx

...
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = () => {
const { id: productId } = useParams();
const {
data: product,
isLoading,
error,
} = useGetProductDetailsQuery(productId);

return (
<>

<Link className="btn btn-light my-3" to="/">
Go Back
</Link>
{isLoading ? (
<Loader />
) : error ? (
<Message variant="danger">
{error?.data?.message || error.error}
</Message>
) : (
<Row>
<Col md={5}> ...
...

## Shopping cart functionality

### ./utils/cartUtils.js

export const addDecimals = (num) => {
return (Math.round(num \* 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
console.log(state);
//Calculate items price
state.itemsPrice = addDecimals(
state.cartItems.reduce((acc, item) => acc + item.price _ item.qty, 0)
);
//Calculate shipping price (if order is over $100 then free, else $10 shipping)
state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
//Calculate tax price (15% tax)
state.taxPrice = addDecimals(Number((0.15 _ state.itemsPrice).toFixed(2)));
//Calculate total price
state.totalPrice = (
Number(state.itemsPrice) +
Number(state.shippingPrice) +
Number(state.taxPrice)
).toFixed(2);

localStorage.setItem('cart', JSON.stringify(state));
return state;
};

### ./slices/cartSlice.js

import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
? JSON.parse(localStorage.getItem('cart'))
: { cartItems: [] };

const cartSlice = createSlice({
name: 'cart',
initialState,
reducers: {
addToCart: (state, action) => {
const item = action.payload;
const existItem = state.cartItems.find((x) => x.\_id === item.\_id);
if (existItem) {
state.cartItems = state.cartItems.map((x) =>
x.\_id === existItem.\_id ? item : x
);
} else {
state.cartItems = [...state.cartItems, item];
}

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },

},
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

### ./store.js

...
import cartSliceReducer from './slices/cartSlice';
...
reducer: {
[apiSlice.reducerPath]: apiSlice.reducer,
cart: cartSliceReducer,
},
...

### ./screens/CartScreen.jsx

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
Row,
Col,
ListGroup,
Image,
Form,
Button,
Card,
} from 'react-bootstrap';
import { FaTable, FaTrash, FasTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
const navigate = useNavigate();
const dispatch = useDispatch();

const cart = useSelector((state) => state.cart);
const { cartItems } = cart;

const addToCartHandler = async (product, qty) => {
dispatch(addToCart({ ...product, qty }));
};
const removeFromCartHandler = async (id) => {
dispatch(removeFromCart(id));
};

const checkoutHandler = () => {
navigate('/login?redirect=/shipping')
}

return (
<Row>

<Col md={8}>
<h1 style={{ marginBottom: '20px' }}></h1>
{cartItems.length === 0 ? (
<Message>
Your cart is empty <Link to="/">Go Back</Link>
</Message>
) : (
<ListGroup variant="flush">
{cartItems.map((item) => {
return (
<ListGroup.Item key={item.\_id}>
<Row>
<Col md={2}>
<Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      ></Image>
</Col>
<Col md={3}>
<Link to={`/products/${item._id}`}>{item.name}</Link>
</Col>
<Col md={2}>${item.price}</Col>
<Col md={2}>
<Form.Control
as="select"
value={item.qty}
onChange={(e) => {
addToCartHandler(item, Number(e.target.value));
}} >
{[...Array(item.countInStock).keys()].map((x) => {
return (
<option key={x + 1} value={x + 1}>
{x + 1}
</option>
);
})}
</Form.Control>
</Col>
<Col md={2}>
<Button
type="button"
variant="light"
onClick={() => removeFromCartHandler(item.\_id)} >
<FaTrash />
</Button>
</Col>
</Row>
</ListGroup.Item>
);
})}
</ListGroup>
)}
</Col>
<Col md={4}>
<Card>
<ListGroup variant="flush">
<ListGroup.Item>
<h2>
Subtotal (
{cartItems.reduce((acc, cur) => acc + Number(cur.qty), 0)})
</h2>
$
{cartItems
.reduce((acc, cur) => acc + Number(cur.qty \* cur.price), 0)
.toFixed(2)}
</ListGroup.Item>
<ListGroup.Item>
<Button
type="button"
className="btn-block"
disabled={cartItems.length < 1}
onClick={checkoutHandler} >
Proceed to checkout
</Button>
</ListGroup.Item>
</ListGroup>
</Card>
</Col>
</Row>
);
};

export default CartScreen;

### ./screens/ProductScreen.jsx

import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
Row,
Col,
Image,
ListGroup,
Card,
Button,
Form,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Rating from '../components/Rating';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useState } from 'react';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
const { id: productId } = useParams();
const {
data: product,
isLoading,
error,
} = useGetProductDetailsQuery(productId);
const dispatch = useDispatch();
const navigate = useNavigate();
const [qty, setQty] = useState(1);

const addToCartHandler = () => {
dispatch(addToCart({ ...product, qty }));
navigate('/cart');
};

return (
<>

<Link className="btn btn-light my-3" to="/">
Go Back
</Link>
{isLoading ? (
<Loader />
) : error ? (
<Message variant="danger">
{error?.data?.message || error.error}
</Message>
) : (
<Row>
<Col md={5}>
<Image src={`../${product.image}`} alt={product.name} fluid />
</Col>
<Col md={4}>
<ListGroup variant="flush">
<ListGroup.Item>
<h3>{product.name}</h3>
</ListGroup.Item>
<ListGroup.Item>
<Rating
value={product.rating}
text={`${product.numReviews} reviews`} ></Rating>
</ListGroup.Item>
<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
</Col>
</Row>
</ListGroup.Item>
<ListGroup.Item>
<Row>
<Col>Status:</Col>
<Col>
<strong>
$
{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
</strong>
</Col>
</Row>
</ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => {
                            return (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            );
                          })}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                  >
                    AddToCart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>

);
};
export default ProductScreen;

### ./components/Header.jsx

import { Navbar, Badge, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
const { cartItems } = useSelector((state) => state.cart);

return (

<header>
<Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
<Container>
<LinkContainer to="/">
<Navbar.Brand style={{ display: 'flex' }}>
<img src={logo}></img>
ShopCart
</Navbar.Brand>
</LinkContainer>
<Navbar.Collapse id="basic-navbar-nav">
<Nav className="ms-auto">
<LinkContainer to="/cart">
<Nav.Link>
<FaShoppingCart /> Cart
{cartItems.length > 0 && (
<Badge pill bg="success" style={{ marginLeft: '5px' }}>
{cartItems.reduce((acc, cur) => acc + Number(cur.qty), 0)}
</Badge>
)}
</Nav.Link>
</LinkContainer>
<LinkContainer to="/login">
<Nav.Link>
<FaShoppingCart /> Sign In
</Nav.Link>
</LinkContainer>
</Nav>
</Navbar.Collapse>
</Container>
</Navbar>
</header>
);
};
export default Header;

### ./index.js

...
import CartScreen from './screens/CartScreen';
...
<Route path="/cart" element={<CartScreen />} />
...

## Backend authentication

:npm i jsonwebtoken
:npm i cookie-parser

### ./backend/utils/generateToken.js

import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
expiresIn: '1d',
});

//Set JWT as HTTP only cookie
res.cookie('jwt', token, {
httpOnly: true,
secure: process.env.NODE*ENV !== 'development',
sameSite: 'strict',
maxAge: 24 * 60 \_ 60 \* 1000, // 1 day
});
};

export default generateToken;

### ./models/userModel.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
{
name: {
type: String,
required: true,
},
email: {
type: String,
required: true,
unique: true,
},
name: {
type: String,
required: true,
},
password: {
type: String,
required: true,
},
isAdmin: {
type: Boolean,
required: true,
default: false,
},
},
{
timestamps: true,
}
);

userSchema.methods.matchPassword = async function (enteredPassword) {
return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre('save', async function (next) {
if (!this.isModified('password')) {
next();
}
const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;

### ./controllers/userController.js

import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (user && (await user.matchPassword(password))) {
generateToken(res, user.\_id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });

} else {
res.status(401);
throw new Error('Invalid email or password');
}
});
// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
const { name, email, password } = req.body;
const userExists = await User.findOne({ email });

if (userExists) {
res.status(400);
throw new Error('User already exists');
}

const user = await User.create({
name,
email,
password,
});

if (user) {
generateToken(res, user.\_id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });

} else {
res.status(400);
throw new Error('Invalid user data');
}
});

// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
res.status(200).json({ message: 'Logged out successfully' });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Public
const getUser = asyncHandler(async (req, res) => {
res.send('user profile');
});

// @desc Update user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
const user = await User.findById(req.user.\_id);

if (user) {
res.status(200).json({
\_id: user.\_id,
name: user.name,
email: user.email,
isAdmin: user.isAdmin,
});
} else {
res.status(404);
throw new Error('User not found');
}
});

// @desc Update users profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
const user = await User.findById(req.user.\_id);

if (user) {
user.name = req.body.name || user.name;
user.email = req.body.email || user.email;
if (req.body.password) {
user.password = req.body.password;
}
const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });

} else {
res.status(404);
throw new Error('User not found');
}
});

// @desc Get Users
// @route GET api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
res.send('get users');
});

// @desc Get User by ID
// @route GET api/users/:id
// @access Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
res.send('get user by id');
});

// @desc Delete Users
// @route DELETE api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
res.send('delete user');
});

// @desc Update User
// @route PUT api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
res.send('update user');
});

export {
authUser,
registerUser,
logoutUser,
getUserProfile,
updateUserProfile,
getUsers,
deleteUser,
getUserByID,
updateUser,
};

### ./middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

//Protect routes
const protect = asyncHandler(async (req, res, next) => {
let token;

//READ JWT FROM THE COOKIE
token = req.cookies.jwt;

if (token) {
try {
const decoded = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decoded.userId).select('-password');
next();
} catch (error) {
console.log(error);
res.status(401);
throw new Error('Not authorized, token failed');
}
} else {
res.status(401);
throw new Error('Not authorized, no token');
}
});

//admin middleware
const admin = (req, res, next) => {
if (req.user && req.user.isAdmin) {
next();
} else {
res.status(401);
throw new Error('Not authorized as admin');
}
};

export { protect, admin };

### ./routes/userRoutes.js

import express from 'express';
import {
authUser,
registerUser,
logoutUser,
getUserProfile,
updateUserProfile,
getUsers,
deleteUser,
getUserByID,
updateUser,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').get(protect, admin, getUsers).post(registerUser);
router.post('/logout', logoutUser);
router.post('/auth', authUser);
router
.route('/profile')
.get(protect, getUserProfile)
.put(protect, updateUserProfile);
router
.route('/:id')
.delete(protect, admin, deleteUser)
.get(protect, admin, getUserByID)
.put(protect, admin, updateUser);

export default router;

### ./server.js

...
import cookieParser from 'cookie-parser';
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
...
import usersRouter from './routes/userRoutes.js';
app.use('/api/users', usersRouter);

## Frontend authentication

:npm i react-toastify

### ./App.js

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
...
<ToastContainer />
...

### ./slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
userInfo: localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
: null,
};

const authSlice = createSlice({
name: 'auth',
initialState,
reducers: {
setCredentials: (state, action) => {
state.userInfo = action.payload;
localStorage.setItem('userInfo', JSON.stringify(action.payload));
},
logout: (state, action) => {
state.userInfo = null;
localStorage.removeItem('userInfo');
},
},
});
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

### ./store.js

import authSliceReducer from './slices/authSlice';
...
auth: authSliceReducer,
...

### ./slices/usersApiSlice.js

import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
endpoints: (builder) => ({
login: builder.mutation({
query: (data) => ({
url: `${USERS_URL}/auth`,
method: 'POST',
body: data,
}),
}),
register: builder.mutation({
query: (data) => ({
url: `${USERS_URL}`,
method: 'POST',
body: data,
}),
}),
logout: builder.mutation({
query: () => ({
url: `${USERS_URL}/logout`,
method: 'POST',
}),
}),
}),
});
export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
usersApiSlice;

### ./components/FormContainer.jsx

import { Container, Row, Col } from 'react-bootstrap';
const FormContainer = ({ children }) => {
return (
<Container>
<Row className="justify-content-md-center">

<Col xs={12} md={6}>
{children}
</Col>
</Row>
</Container>
);
};
export default FormContainer;

### ./components/Header.jsx

import { Navbar, Badge, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
const { cartItems } = useSelector((state) => state.cart);
const { userInfo } = useSelector((state) => state.auth);
const dispatch = useDispatch();
const navigate = useNavigate();
const [logoutApiCall] = useLogoutMutation();

const logoutHandler = async (e) => {
try {
await logoutApiCall().unwrap();
dispatch(logout());
navigate('/login');
} catch (err) {
console.log(err);
}
};
...
return ( ...
...
{userInfo ? (
<NavDropdown title={userInfo.name} id="username">
<LinkContainer to="/profile">
<NavDropdown.Item>Profile</NavDropdown.Item>
</LinkContainer>
<NavDropdown.Item onClick={logoutHandler}>
Logout
</NavDropdown.Item>
</NavDropdown>
) : (
<LinkContainer to="/login">
<Nav.Link>
<FaShoppingCart /> Sign In
</Nav.Link>
</LinkContainer>
)}
... ...

### ./screens/LoginScreen.jsx

import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const dispatch = useDispatch();
const navigate = useNavigate();
const [login, { isLoading }] = useLoginMutation();
const { userInfo } = useSelector((state) => state.auth);
const { search } = useLocation();
const sp = new URLSearchParams(search);
const redirect = sp.get('redirect') || '/';

useEffect(() => {
if (userInfo) {
navigate(redirect);
}
}, [userInfo, redirect, navigate]);

const submitHandler = async (e) => {
e.preventDefault();
try {
const res = await login({ email, password }).unwrap();
dispatch(setCredentials({ ...res }));
navigate(redirect);
} catch (err) {
toast.error(err?.data?.message || err?.error);
}
};

return (
<FormContainer>

<h1>Sign In</h1>
<Form onSubmit={submitHandler}>
<Form.Group controlId="email" className="my-3">
<Form.Label>Email Address</Form.Label>
<Form.Control
type="email"
placeholder="Enter email"
value={email}
onChange={(e) => setEmail(e.target.value)} ></Form.Control>
</Form.Group>
<Form.Group controlId="password" className="my-3">
<Form.Label>Password</Form.Label>
<Form.Control
type="password"
placeholder="Enter password"
value={password}
onChange={(e) => setPassword(e.target.value)} ></Form.Control>
</Form.Group>
<Button
          type="submit"
          variant="primary"
          className="my-3"
          disabled={isLoading}
        >
Sign In
</Button>
{isLoading && <Loader />}
</Form>
<Row className="py-3">
<Col>
New Customer?{' '}
<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
Register
</Link>
</Col>
</Row>
</FormContainer>
);
};
export default LoginScreen;

### ./screens/RegisterScreen.jsx

import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const RegisterScreen = () => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

const dispatch = useDispatch();
const navigate = useNavigate();
const [register, { isLoading }] = useRegisterMutation();
const { userInfo } = useSelector((state) => state.auth);

const { search } = useLocation();
const sp = new URLSearchParams(search);
const redirect = sp.get('redirect') || '/';
useEffect(() => {
if (userInfo) {
navigate(redirect);
}
}, [userInfo, redirect, navigate]);

const submitHandler = async (e) => {
e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }

};

return (
<FormContainer>

<h1>Register</h1>
<Form onSubmit={submitHandler}>
<Form.Group controlId="name" className="my-3">
<Form.Label>Name</Form.Label>
<Form.Control
type="name"
placeholder="Enter name"
value={name}
onChange={(e) => setName(e.target.value)} ></Form.Control>
</Form.Group>
<Form.Group controlId="email" className="my-3">
<Form.Label>Email Address</Form.Label>
<Form.Control
type="email"
placeholder="Enter email"
value={email}
onChange={(e) => setEmail(e.target.value)} ></Form.Control>
</Form.Group>
<Form.Group controlId="password" className="my-3">
<Form.Label>Password</Form.Label>
<Form.Control
type="password"
placeholder="Enter password"
value={password}
onChange={(e) => setPassword(e.target.value)} ></Form.Control>
</Form.Group>
<Form.Group controlId="confirmPassword" className="my-3">
<Form.Label>Confirm Password</Form.Label>
<Form.Control
type="password"
placeholder="Confirm password"
value={confirmPassword}
onChange={(e) => setConfirmPassword(e.target.value)} ></Form.Control>
</Form.Group>
<Button
          type="submit"
          variant="primary"
          className="my-3"
          disabled={isLoading}
        >
Register
</Button>
{isLoading && <Loader />}
</Form>
<Row className="py-3">
<Col>
Already have an account?{' '}
<Link to={redirect ? `/login?redirect=${redirect}` : '/register'}>
Login
</Link>
</Col>
</Row>
</FormContainer>
);
};
export default RegisterScreen;

### ./index.js

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
...
<Route path="/login" element={<LoginScreen />} />
<Route path="/register" element={<RegisterScreen />} />
...

## Checkout process

### ./backend/controllers/orderController.js

import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

// POST /api/orders
// PRIVATE
const addOrderItems = asyncHandler(async (req, res) => {
const {
orderItems,
shippingAddress,
paymentMethod,
itemsPrice,
taxPrice,
shippingPrice,
totalPrice,
} = req.body;

if (orderItems && orderItems.length === 0) {
res.status(400);
throw new Error('no order items');
} else {
const order = new Order({
orderItems: orderItems.map((x) => ({
...x,
product: x.\_id,
\_id: undefined,
})),
user: req.user.\_id,
shippingAddress,
paymentMethod,
itemsPrice,
taxPrice,
shippingPrice,
totalPrice,
});

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);

}
});

// GET /api/orders/myorders
// PRIVATE
const getMyOrders = asyncHandler(async (req, res) => {
const orders = await Order.find({ user: req.user.\_id });
res.status(200).json(orders);
});

// GET /api/orders/:id
// PRIVATE
const getOrderById = asyncHandler(async (req, res) => {
const order = await Order.findById(req.params.id).populate(
'User',
'name email'
);
if (order) {
res.status(200).json(order);
} else {
res.status(404);
throw new Error('Order not found');
}
});

// GET /api/orders/:id/pay
// PRIVATE
const updateOrderToPaid = asyncHandler(async (req, res) => {
res.send('update order to paid');
});

// GET /api/orders/:id/deliver
// PRIVATE
const updateOrderTDelivered = asyncHandler(async (req, res) => {
res.send('update order to delivered');
});

// GET /api/orders
// PRIVATE / ADMIN
const getOrders = asyncHandler(async (req, res) => {
res.send('get all orders');
});

export {
addOrderItems,
getMyOrders,
getOrderById,
updateOrderToPaid,
updateOrderTDelivered,
getOrders,
};

### ./backend/routes/orderRoutes.js

import express from 'express';
import {
addOrderItems,
getMyOrders,
getOrderById,
updateOrderToPaid,
updateOrderTDelivered,
getOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getOrders).post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, admin, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderTDelivered);

export default router;

### ./backend/server.js

...
import orderRouter from './routes/orderRoutes.js';
app.use('/api/orders', orderRouter);
...

### ./frontend/src/slices/cartSlice.js

const initialState = localStorage.getItem('cart')
? JSON.parse(localStorage.getItem('cart'))
: { cartItems: [], shippingAddress: {}, paymentMethod: 'Paypal' };
...
...
saveShippingAddress: (state, action) => {
state.shippingAddress = action.payload;
return updateCart(state);
},
savePaymentMethod: (state, action) => {
state.paymentMethod = action.payload;
return updateCart(state);
},
clearCartItems: (state, action) => {
state.cartItems = [];
return updateCart(state);
},
...
export const {
addToCart,
removeFromCart,
saveShippingAddress,
savePaymentMethod,
clearCartItems,
} = cartSlice.actions;

### ./frontend/src/slices/ordersApiSlice.js

import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../constants';

export const ordersApiSlice = apiSlice.injectEndpoints({
endpoints: (builder) => ({
createOrder: builder.mutation({
query: (order) => ({
url: ORDERS_URL,
method: 'POST',
body: { ...order },
}),
}),
}),
});
export const { useCreateOrderMutation } = ordersApiSlice;

### ./components/CheckoutSteps.jsx

import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
return (
<Nav className="justify-content-center mb-4">
<Nav.Item>
{step1 ? (
<LinkContainer to="/login">
<Nav.Link>Sign In</Nav.Link>
</LinkContainer>
) : (
<Nav.Link disabled>Sign In</Nav.Link>
)}
</Nav.Item>
<Nav.Item>
{step2 ? (
<LinkContainer to="/shipping">
<Nav.Link>Shipping</Nav.Link>
</LinkContainer>
) : (
<Nav.Link disabled>Shipping</Nav.Link>
)}
</Nav.Item>
<Nav.Item>
{step3 ? (
<LinkContainer to="/payment">
<Nav.Link>Payment</Nav.Link>
</LinkContainer>
) : (
<Nav.Link disabled>Payment</Nav.Link>
)}
</Nav.Item>
<Nav.Item>
{step4 ? (
<LinkContainer to="/placeorder">
<Nav.Link>Place Order</Nav.Link>
</LinkContainer>
) : (
<Nav.Link disabled>Place Order</Nav.Link>
)}
</Nav.Item>
</Nav>
);
};
export default CheckoutSteps;

### ./components/PrivateRoute.jsx

import { Outlet, Navigate } from 'react-router-dom';
import { UseSelector, useSelector } from 'react-redux';

const PrivateRoute = () => {
const { userInfo } = useSelector((state) => state.auth);
console.log(userInfo);
return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};
export default PrivateRoute;

### ./screens/ShippingScreen.jsx

import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
const cart = useSelector((state) => state.cart);
const { shippingAddress } = cart;

const [address, setAddress] = useState(shippingAddress?.address || '');
const [city, setCity] = useState(shippingAddress?.city || '');
const [postalCode, setPostalCode] = useState(
shippingAddress?.postalCode || ''
);
const [country, setCountry] = useState(shippingAddress?.country || '');

const navigate = useNavigate();
const dispatch = useDispatch();

const submitHandler = (e) => {
e.preventDefault();
dispatch(saveShippingAddress({ address, city, postalCode, country }));
navigate('/payment');
};

return (
<FormContainer>
<CheckoutSteps step1 step2 />
<h1>Shipping</h1>
<Form onSubmit={submitHandler}>
<Form.Group controlId="address" className="my-2">
<Form.Label>Address</Form.Label>
<Form.Control
type="text"
placeholder="Enter address"
value={address}
onChange={(e) => setAddress(e.target.value)} ></Form.Control>
</Form.Group>
<Form.Group controlId="city" className="my-2">
<Form.Label>city</Form.Label>
<Form.Control
type="text"
placeholder="Enter city"
value={city}
onChange={(e) => setCity(e.target.value)} ></Form.Control>
</Form.Group>
<Form.Group controlId="postalCode" className="my-2">
<Form.Label>Postal Code</Form.Label>
<Form.Control
type="text"
placeholder="Enter postal code"
value={postalCode}
onChange={(e) => setPostalCode(e.target.value)} ></Form.Control>
</Form.Group>
<Form.Group controlId="country" className="my-2">
<Form.Label>Country</Form.Label>
<Form.Control
type="text"
placeholder="Enter country"
value={country}
onChange={(e) => setCountry(e.target.value)} ></Form.Control>
</Form.Group>
<Button type="submit" variant="primary" className="my-2">
Continue
</Button>
</Form>
</FormContainer>
);
};
export default ShippingScreen;

### ./screens/PaymentScreen.jsx

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../slices/cartSlice';

const PaymentScreen = () => {
const [paymentMethod, setPaymentMethod] = useState('PayPal');

const dispatch = useDispatch();
const navigate = useNavigate();

const cart = useSelector((state) => state.cart);
const { shippingAddress } = cart;

useEffect(() => {
if (!shippingAddress) {
navigate('/shipping');
}
}, [shippingAddress, navigate]);

const submitHandler = (e) => {
e.preventDefault();
dispatch(savePaymentMethod(paymentMethod));
navigate('/placeorder');
};

return (
<FormContainer>
<CheckoutSteps step1 step3 step2 />
<h1>Payment Method</h1>
<Form onSubmit={submitHandler}>
<Form.Group>
<Form.Label as="legend">Select Method</Form.Label>
<Col>
<Form.Check
type="radio"
className="my-2"
label="Paypal or Credit Card"
id="PayPal"
name="paymentMethod"
value="Paypal"
checked
onChange={(e) => setPaymentMethod(e.target.value)} ></Form.Check>
</Col>
</Form.Group>
<Button type="submit" variant="primary">
Continue
</Button>
</Form>
</FormContainer>
);
};
export default PaymentScreen;

### ./screens/PlaceOrderScreen.jsx

import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
const navigate = useNavigate();
const dispatch = useDispatch();
const cart = useSelector((state) => state.cart);

const [createOrder, { isLoading, error }] = useCreateOrderMutation();

useEffect(() => {
if (!cart.shippingAddress.address) {
navigate('/shipping');
} else if (!cart.paymentMethod) {
navigate('/payment');
}
}, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

const placeOrderHandler = async () => {
try {
const res = await createOrder({
orderItems: cart.cartItems,
shippingAddress: cart.shippingAddress,
paymentMethod: cart.paymentMethod,
itemsPrice: cart.itemsPrice,
shippingPrice: cart.shippingPrice,
taxPrice: cart.taxPrice,
totalPrice: cart.totalPrice,
}).unwrap();
dispatch(clearCartItems());
navigate(`/order/${res._id}`);
} catch (error) {
toast.error(error);
}
};
return (
<>
<CheckoutSteps step1 step2 step3 step4 />
<Row>
<Col md={8}>
<ListGroup variant="flush">
<ListGroup.Item>
<h2> Shipping</h2>
<p>
<strong>Address:</strong>
{cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
{cart.shippingAddress.postalCode}
</p>
</ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${cart.ShippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && (
                  <Message variant="danger">{error?.data?.message}</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>

);
};
export default PlaceOrderScreen;

### ./index.js

...
import PrivateRoute from './components/PrivateRoute';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';

...
<Route path="" element={<PrivateRoute />}>
<Route path="/shipping" element={<ShippingScreen />} />
<Route path="/payment" element={<PaymentScreen />} />
<Route path="/placeorder" element={<PlaceOrderScreen />} />
</Route>
...
