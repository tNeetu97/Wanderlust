let express=require('express')
let router=express.Router()
let listing=require('../models/listing.js');
router.get('/filter/trending',async (req,res)=>{
     let listings=await listing.find({category:{$in:['Trending']}})
    if(!listings.length){
        req.flash("error","listing of given category is not available")
        res.redirect('/listings')
    }else{
        res.render('index.ejs',{listings});
    }
      
})
router.get('/filter/rooms',async (req,res)=>{
     let listings=await listing.find({category:{$in:['Rooms']}})
    if(!listings.length){
        req.flash("error","listing of given category is not available")
        res.redirect('/listings')
    }else{
          res.render('index.ejs',{listings});
    }
    
})
router.get('/filter/iCities',async (req,res)=>{
     let listings=await listing.find({category:{$in:['Iconic cities']}})
    if(!listings.length){
        req.flash("error","listing of given category is not available")
        res.redirect('/listings')
    }
    else{
        res.render('index.ejs',{listings});
    }
      
})
router.get('/filter/mountains',async (req,res)=>{
     let listings=await listing.find({category:{$in:['Mountains']}})
    if(!listings.length){
        req.flash("error","listing of given category is not available")
        res.redirect('/listings')
    }else{
        res.render('index.ejs',{listings});
    }
      
})
router.get('/filter/beach',async (req,res)=>{
     let listings=await listing.find({category:{$in:['Beach']}})
    if(!listings.length){
        req.flash("error","listing of given category is not available")
        res.redirect('/listings')
    }else{
        res.render('index.ejs',{listings});
    }
     
})
router.get('/filter/castles',async (req,res)=>{
     let listings=await listing.find({category:{$in:['Castles']}})
    if(!listings.length){
        req.flash("error","listing of given category is not available")
        res.redirect('/listings')
    }else{
        res.render('index.ejs',{listings});
    }
     
})
router.get('/filter/pool',async (req,res)=>{
     let listings=await listing.find({category:{$in:['Pool']}})
    if(!listings.length){
        req.flash("error","listing of given category is not available")
        res.redirect('/listings')
    }else{
        res.render('index.ejs',{listings});
    }
     
})
router.get('/filter/camping',async (req,res)=>{
     let listings=await listing.find({category:{$in:['Camping']}})
    if(!listings.length){
        req.flash("error","listing of given category is not available")
        res.redirect('/listings')
    }else{
        res.render('index.ejs',{listings});
    }
     
})
router.get('/filter/snow',async (req,res)=>{
     let listings=await listing.find({category:{$in:['Snow']}})
    if(!listings.length){
        req.flash("error","listing of given category is not available")
        res.redirect('/listings')
    }else{
        res.render('index.ejs',{listings});
    }
      
})
router.get('/filter/farms',async (req,res)=>{
     let listings=await listing.find({category:{$in:['Farms']}})
    if(!listings.length){
        req.flash("error","listing of given category is not available")
        res.redirect('/listings')
    }else{
        res.render('index.ejs',{listings});
    }
    
})
module.exports=router;
