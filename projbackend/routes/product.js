const express = require('express');
const router  = express.Router();

const {getProductById,createProduct,getProduct,photo,deleteProduct,updateProduct,getAllProducts,getAllUniqueCategories}   = require('../controllers/product');
const {getUserById}   = require('../controllers/user');
const {isSignedIn,isAuthenticated,isAdmin}   = require('../controllers/auth');

//all of params
router.param("userId",getUserById);
router.param("productId",getProductById);

//all of actual routes
router.post('/product/create/:userId',isSignedIn,isAuthenticated,createProduct);

//read Routes
router.get('/product/:productId',getProduct);
//helps in optimization for loading photo
router.get('/product/photo/:productId',photo);


//Delete Route
router.delete('/product/:productId/:userId',isSignedIn,isAuthenticated,isAdmin,deleteProduct);



//Update Route
router.put('/product/:productId/:userId',isSignedIn,isAuthenticated,isAdmin,updateProduct);


//Listing route (home page)
router.get('/products',getAllProducts);
router.get('/products/categories',getAllUniqueCategories);

module.exports = router;