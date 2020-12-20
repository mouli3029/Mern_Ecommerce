const express = require('express');
const router = express.Router();

const {getUserById,getUser,updateUser,userPurchaseList} = require('../controllers/user');
const {isSignedIn,isAdmin,isAuthenticated} = require('../controllers/auth');

//Whenever there is any with : it is interpreted to userId and 
router.param('userId',getUserById);

router.get('/user/:userId',isSignedIn,isAuthenticated,getUser);
router.put('/user/:userId',isSignedIn,isAuthenticated, updateUser);
router.get('/orders/user/:userId',isSignedIn,isAuthenticated, userPurchaseList);


module.exports = router;