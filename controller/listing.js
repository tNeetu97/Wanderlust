let listing=require('../models/listing.js')
let {listingSchema}=require('../schema.js')
module.exports.index=async (req,res)=>{
    let  listings= await listing.find({});
     res.render('index.ejs',{listings} );
}
module.exports.show=async (req,res)=>{
    let {id}=req.params;
    let post= await listing.find({_id:id}).populate({path:'reviews',populate:{path:'author'}}).populate('owner');
    if(!post.length){
        req.flash("error","Listing not found")
        res.redirect('/listings')
    }
    res.render('display.ejs',{post});
}
module.exports.new=(req,res)=>{
    res.render('new.ejs');
}
module.exports.newPost=async (req,res)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    let {title,description,image,price,location,country,category}=req.body;
    let result=listingSchema.validate(req.body);
    let newUser=await listing.insertOne({title:title,description:description, image :{url:url,filename:filename},price:price,location:location,country:country,owner:req.user._id,category:category})
    req.flash('success','New listing added successfully');
    res.redirect('/listings')
}
module.exports.edit=async (req,res)=>{
    let {id}=req.params;
    let post= await listing.find({_id:id});
    let originalImageUrl=post[0].image.url;
    originalImageUrl=originalImageUrl.replace('/upload','/upload/h_200,w_200');
    console.log(originalImageUrl)
    res.render('edit.ejs',{post,originalImageUrl});
}
module.exports.editPatch=async (req,res)=>{
    let {id}=req.params;
    let {title,description,image,price,category}=req.body;
    if(typeof req.file !== "undefined"){
      let url=req.file.path;
      let filename=req.file.filename;
      await listing.updateMany({_id:id},{title:title,description:description,image:{url,filename}, price:price ,category:category} ).then((result)=>{}).catch((err)=>{console.log(err.message)});
    }else{
      await listing.updateMany({_id:id},{title:title,description:description, price:price,category:category} ).then((result)=>{}).catch((err)=>{console.log(err.message)});
    }
    req.flash('success',"listing updated")
    res.redirect(`/listings/${id}/show`);
}
module.exports.delete=async (req,res)=>{
     let {id}=req.params;
     await listing.findByIdAndDelete({_id:id});
     req.flash('success',' listing deleted ');
     res.redirect('/listings')
}