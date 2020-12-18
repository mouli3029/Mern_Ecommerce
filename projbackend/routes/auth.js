const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {signout ,signup} = require('../controllers/auth')


router.post('/signup', [
    check('name',"Name should be atleast 3 characters").isLength({min : 3}),
    check('email',"Email is required").isEmail(),
    check('password',"Password should be atleast 3 characters").length({min : 3})
], signup);
router.get('/signout',signout);

module.exports = router;