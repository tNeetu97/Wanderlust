let mongoose=require('mongoose');
let reviewSchema= new mongoose.Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }

})
let review=mongoose.model('review',reviewSchema);
module.exports=review;