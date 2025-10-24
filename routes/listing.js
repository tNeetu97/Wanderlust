let express=require('express');
let router=express.Router();
let multer=require('multer');
let {storage}=require('../cloudConfig.js');
let upload=multer({storage});
let wrapAsync=require('../utils/wrapAsync.js');
let {listingSchema,reviewSchema}=require('../schema.js');
let ExpressError=require('../utils/ExpressError.js');
let  listingControl=require('../controller/listing.js')
let listing=require('../models/listing.js');
    let {isLoggedin,isOwner}=require('../middleware.js')
let validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(',')
        throw new ExpressError(400,errMsg)
    }else{
        next();
    }
}
//index
router.get('/',wrapAsync(listingControl.index));
//show
router.get('/:id/show',wrapAsync(listingControl.show));
//new
router.route('/new')
.get(isLoggedin, listingControl.new)
.post(isLoggedin ,upload.single('image'),wrapAsync(listingControl.newPost))
//edit
router.route('/:id/edit')
.get(isLoggedin,isOwner,wrapAsync(listingControl.edit))
.patch(isLoggedin,isOwner,upload.single('image'),wrapAsync(listingControl.editPatch))
//delete
router.delete('/:id/delete',isLoggedin,isOwner,wrapAsync(listingControl.delete))
module.exports=router;