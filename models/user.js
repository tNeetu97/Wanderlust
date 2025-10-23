let mongoose=require('mongoose');
let passportLocalMongoose=require('passport-local-mongoose');
let userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    }
})
userSchema.plugin(passportLocalMongoose)
module.exports=mongoose.model('user',userSchema);