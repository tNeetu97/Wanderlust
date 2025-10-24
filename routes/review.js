let express=require('express')
let router=express.Router({mergeParams:true})
let wrapAsync=require('../utils/wrapAsync.js');
let {listingSchema,reviewSchema}=require('../schema.js');
let ExpressError=require('../utils/ExpressError.js');
let review=require('../models/reviews.js');
let listing=require('../models/listing.js');
let reviewControl=require('../controller/review.js');
let {isLoggedin,isAuthor}=require('../middleware');
let validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(',')
        throw new ExpressError(400,errMsg)
    }else{
        next();
    }
}
//add review
router.post('/',isLoggedin,validateReview,wrapAsync(reviewControl.add))
//delete review
router.delete('/:reviewId',isLoggedin,isAuthor,wrapAsync(reviewControl.delete))
module.exports=router;
