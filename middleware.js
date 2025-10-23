let listing=require('./models/listing.js')
let review=require('./models/reviews.js')
module.exports.isLoggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash('error','user must be logged in');
        return res.redirect('/login')
    }
    next();
}
module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next()
}
module.exports.isOwner=async (req,res,next)=>{
    let {id}=req.params;
    let list=await listing.findById(id);
    if(!list.owner.equals(res.locals.currUser._id)){
          req.flash('error','you have not access to this post');
          return res.redirect(`/listings/${id}/show`);
    }
    next()

}
module.exports.isAuthor=async (req,res,next)=>{
     let {id,reviewId}=req.params;
    let view=await review.findById(reviewId);
    if(!view.author.equals(res.locals.currUser._id)){
        req.flash('error','Only Author of the review can delete it');
        return res.redirect(`/listings/${id}/show`);
    }
    next()
}
