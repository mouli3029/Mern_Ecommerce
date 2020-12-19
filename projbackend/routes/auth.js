const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {signout ,signup,signin,isSignedIn} = require('../controllers/auth')


router.post('/signup', [
    check('name',"Name should be atleast 3 characters").isLength({min : 3}),
    check('email',"Email is required").isEmail(),
    check('password',"Password should be atleast 3 characters").isLength({min : 3})
], signup);

router.post('/signin', [
    check('email',"Email is required").isEmail(),
    check('password',"Password is Required").isLength({min : 3})
], signin);

router.get('/signout',signout);

router.get('/testroute',isSignedIn,(req,res)=>{
    res.json(req.auth);
    
})


module.exports = router;