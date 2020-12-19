const User = require('../models/user');
const { check,validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg,
            param : errors.array()[0].param,
        })
    }


    const user = new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err : "Not able to save in user in DB"
            })
        }
        res.json({
            name : user.name,
            email :user.email,
            id : user._id
        });
    })
}

exports.signin = (req,res) =>{
    const {email,password} = req.body;  //Destructing Object

    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg,
            param : errors.array()[0].param,
        })
    }

    User.findOne({email},(err,user)=>{
        if(err){
            res.status(400).json({
                error : "User email doesnot exists"
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error : "Email and Password do not match !"
            })          
        }

        //Create  token 
        const token = jwt.sign({_id:user._id},process.env.SECRET);
        //Put token in cookie.
        res.cookie("token",token,{expire: new Date()+9999});

        //send response to front end.
        const {_id,name,email,role} = user;
        return res.json({token,user : {_id,name,email,role}})
    })



}


exports.signout = (req,res) =>{
    res.json({
        message : "User Singout"
    });
};
