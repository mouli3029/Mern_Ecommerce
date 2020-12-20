const { json } = require('body-parser');
const Category = require('../models/category');

exports.getCategoryById = (req,res,next,id)=>{
    Category.findById(id).exec((err,cate) =>{
        if(err){
            return res.status(400).json({
                error : "Category not found in DB"
            })
        }
        req.category = cate;
        next();
    })
}
exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
      if (err) {
        return res.status(400).json({
          error: "NOT able to save category in DB"
        });
      }
      res.json({ category });
    });
  };
  
exports.getCategory = (req,res)=>{
    return res.json(req.category);
}

exports.getAllCategories = (req,res)=>{
    Category.find().exec((err,categories)=>{
        if(err){
            return res.status(400).json({
                error : "No Categories found"
            })
        }
        res.json(categories);
    })
}

exports.updateCategory = (req,res)=>{
    //req.category is due to the middleware which we are grabing from param
    const category = req.category;
    category.name = req.body.name;

    category.save((err,updatedCategory)=>{
        if(err){
            return res.status(400).json({
                error : "Failed to Update Category"
            })
        }
        res.json(updatedCategory);
    })
}

exports.deleteCategory = (req,res) =>{
    const category = req.category;

    category.remove((err,category)=>{
        if(err){
            return res.status(400).json({
                error : "Unable to delete "
            })
        }
        res.json({
            message : `${category.name} successfully deleted`
        })

    })
}