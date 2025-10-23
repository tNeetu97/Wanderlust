let cloudinary=require('cloudinary').v2;
let {CloudinaryStorage}=require('multer-storage-cloudinary')
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})
let storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'wanderlust_dev',
        allowFormat:['jpg','png','jpeg']
    }
})
module.exports={cloudinary,storage}