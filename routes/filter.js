let express=require('express')
let router=express.Router({mergeParams:true})
let listing=require('../models/listing.js');
router.get('/trending',async (req,res)=>{
     let listings=await listing.find({category:{$in:['Trending']}})
    if(!listings.length){
        req.flash("error"," Trending listing not found")
        res.redirect('/listings')
    }
     res.render('index.ejs',{listings});
})
router.get('/rooms',async (req,res)=>{
     let listings=await listing.find({category:{$in:['Rooms']}})
    if(!listings.length){
        req.flash("error","listing of given category is not available")
        res.redirect('/listings')
    }
     res.render('index.ejs',{listings});
})
router.get('/iCities',async (req,res)=>{
     let listings=await listing.find({category:{$in:['Iconic cities']}})
    if(!listings.length){
        req.flash("error","listing of given category is not available")
        res.redirect('/listings')
    }
     res.render('index.ejs',{listings});
})
router.get('/mountains',async (req,res)=>{
     let listings=await listing.find({category:{$in:['Mountains']}})
    if(!listings.length){
        req.flash("error","listing of given category is not available")
        res.redirect('/listings')
    }
     res.render('index.ejs',{listings});
})
router.get('/beach',async (req,res)=>{
     let listings=await listing.find({category:{$in:['Beach']}})
    if(!listings.length){
        req.flash("error","listing of given category is not available")
        res.redirect('/listings')
    }
     res.render('index.ejs',{listings});
})
router.get('/castles',async (req,res)=>{
     let listings=await listing.find({category:{$in:['Castles']}})
    if(!listings.length){
        req.flash("error","listing of given category is not available")
        res.redirect('/listings')
    }
     res.render('index.ejs',{listings});
})
router.get('/pool',async (req,res)=>{
     let listings=await listing.find({category:{$in:['Pool']}})
    if(!listings.length){
        req.flash("error","listing of given category is not available")
        res.redirect('/listings')
    }
     res.render('index.ejs',{listings});
})
router.get('/camping',async (req,res)=>{
     let listings=await listing.find({category:{$in:['Camping']}})
    if(!listings.length){
        req.flash("error","listing of given category is not available")
        res.redirect('/listings')
    }
     res.render('index.ejs',{listings});
})
router.get('/snow',async (req,res)=>{
     let listings=await listing.find({category:{$in:['Snow']}})
    if(!listings.length){
        req.flash("error","listing of given category is not available")
        res.redirect('/listings')
    }
     res.render('index.ejs',{listings});
})
router.get('/farms',async (req,res)=>{
     let listings=await listing.find({category:{$in:['Farms']}})
    if(!listings.length){
        req.flash("error","listing of given category is not available")
        res.redirect('/listings')
    }
     res.render('index.ejs',{listings});
})
module.exports=router;
