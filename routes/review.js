let express=require('express')
let router=express.Router({mergeParams:true})
let wrapAsync=require('C:/Users/ADMIN/OneDrive/Desktop/vsforjava/major_project/utils/wrapAsync.js');
let {listingSchema,reviewSchema}=require('C:/Users/ADMIN/OneDrive/Desktop/vsforjava/major_project/schema.js');
let ExpressError=require('C:/Users/ADMIN/OneDrive/Desktop/vsforjava/major_project/utils/ExpressError.js');
let review=require('C:/Users/ADMIN/OneDrive/Desktop/vsforjava/major_project/models/reviews.js');
let listing=require('C:/Users/ADMIN/OneDrive/Desktop/vsforjava/major_project/models/listing.js');
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
