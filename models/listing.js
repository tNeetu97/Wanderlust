let mongoose=require('mongoose');
let review=require('./reviews');
let listingSchema=new mongoose.Schema({
    title:{type:String },
    description:{type:String },
    image:{url:String,
        filename:String },
    price:{type:Number},
    location:{type:String },
    country:{type:String },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'review'
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    category:{
         type:[String],
         enum:["Trending","Rooms",'Iconic cities',"Mountains","Beach","Castles","Pool","Camping","Snow","Farms"]
    }
});

listingSchema.post('findOneAndDelete',async (listing)=>{
    if(listing){
        await review.deleteMany({_id:{$in: listing.reviews}})
    }
})
let listing=mongoose.model('listing',listingSchema);
module.exports=listing;