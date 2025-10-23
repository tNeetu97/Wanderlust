let mongoose=require('mongoose');
let initdata=require('./data.js');
async function main(){await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')}
main().then(()=>console.log("connection successful")).catch((err)=>{console.log(err)});
let listing=require('../models/listing.js');
let initDB=async ()=>{
   await listing.deleteMany({});
   initdata.data=initdata.data.map((obj)=>({...obj,owner:"68f5ce942a7ceb02a3218edd"}));
   await listing.insertMany(initdata.data);
   console.log('data was initialize');
}
initDB();