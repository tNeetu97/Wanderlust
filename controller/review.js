let review=require('../models/reviews.js');
let listing=require('../models/listing.js')
let {reviewSchema}=require('../schema.js');
module.exports.add=async (req,res)=>{
    let {id}=req.params;
    list= await listing.findById(id);
    let newReview=new review(req.body.review);
    newReview.author=req.user._id;
    list.reviews.push(newReview);
    await newReview.save();
    await list.save()
    req.flash('success','New review added successfully');
    res.redirect(`/listings/${id}/show`)
}
module.exports.delete=async(req,res)=>{
    let {id,reviewId}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await review.findByIdAndDelete(reviewId);
    req.flash('success',' review deleted');
    res.redirect(`/listings/${id}/show`)
}