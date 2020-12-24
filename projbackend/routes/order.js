const express = require('express');
const router  = express.Router();

const {getUserById,pushOrderInPurchaseList}   = require('../controllers/user');
const {isSignedIn,isAuthenticated,isAdmin}   = require('../controllers/auth');
const {updateStock} = require('../controllers/product');

const {getOrderById,createOrder,getAllOrders,updateStatus,getOrderStatus}  = require('../controllers/order');

//all of params
router.param("userId",getUserById);
router.param("orderId",getOrderById);



//Actual Routes
//Create
router.post('/order/create/:userId',isSignedIn,isAuthenticated,pushOrderInPurchaseList,updateStock,createOrder);

//Read
router.get('/order/all/:userId',isSignedIn,isAuthenticated,isAdmin,getAllOrders);

//Status of the order
router.get('/order/status/:userId',isSignedIn,isAuthenticated,isAdmin,getOrderStatus);
router.put('/order/:orderId/status/:userId',isSignedIn,isAuthenticated,isAdmin,updateStatus);

module.exports = router;