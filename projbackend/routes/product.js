const express = require('express');
const router  = express.Router();

const {getProductById}   = require('../controllers/product');
const {getUserById}   = require('../controllers/user');
const {isSignedIn,isAuthenticated,isAdmin}   = require('../controllers/auth');

//all of params
router.param("userId",getUserById);
router.param("productId",getProductById);

//all of actual routes


module.exports = router;