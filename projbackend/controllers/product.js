const Product  = require('../models/product');
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

exports.getProductById = (req,res,next,id)=>{
    Product.findById(id)
    .populate('category')
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error : "Product not Found"
            })
        }
        req.product = product;
        next();
    })
}
exports.createProduct = (req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error : "Problem with Image"
            });
        }

        //TODO : restrictions on fields.
        let product = new Product(fields);
        //Handling the file here..   2 * 1024 * 1024
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error : "File size too big"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;

        }

        //save to the DB
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error : "saving tshirt in DB failed"
                })
            }
            res.json(product);
        })
    })
}