const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const blogSchema = require('../schemas/blogSchema');
const Blog = new mongoose.model("Blog", blogSchema);

// get all Blogs
router.get('/', async (req, res) => {
    await Blog.find().then((data) => {
        console.log(data);
             res.json({
                 result: data,
                 message: 'success'
             })
         
     }).catch(err => {
         console.log(err);
         res.json({
             message: "error"
         })
   
     })
})


router.post('/', async (req, res) => {
    const newBlog = new Feedback(req.body);
    await newBlog.save().then((data) => {

        res.status(200).json({
            
            message: 'success'
        })
    }).catch((err) => {
        if(err){
            console.log(err);
            res.status(500).json({
                message: 'error'
        })}})
});



module.exports = router;