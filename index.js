if(process.env.NODE_ENV!='production'){
     require('dotenv').config();
}

let express=require('express');
let app=express();
let port=process.env.PORT || 3000;
let ExpressError=require('./utils/ExpressError.js');
let path=require('path');
let ejsMate=require('ejs-mate');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.engine('ejs',ejsMate);
let listing=require('./models/listing.js')
let methodOverride=require('method-override');
app.use(methodOverride('_method'));
let mongoose=require('mongoose');
let passport=require('passport');
let localstratergy=require('passport-local');
let user=require('./models/user.js');
let mongo_url=process.env.ATLASDB_URL;
async function main(){await mongoose.connect(mongo_url)}
main().then(()=>console.log("connection successful")).catch((err)=>{console.log(err)});
let session=require('express-session');
let mongoStore=require('connect-mongo');
let flash=require('connect-flash')
let store=mongoStore.create({
     mongoUrl:mongo_url,
     crypto:{
          secret: process.env.SECRET,
     },
     touchAfter:24*3600
})
store.on('error',()=>{console.log("Error in Mongo Session Store",error)})
let sessionOptions={store,secret:process.env.SECRET,resave:false,saveUninitialized:true ,cookie:{expires:Date.now()+7*24*60*60*1000,
     maxAge:7*24*60*60*1000,httpOnly:true
}};
app.use(session(sessionOptions))
app.use(flash())
app.use(passport.initialize());
app.use(passport.session())
passport.use(new localstratergy(user.authenticate()));
passport.serializeUser(user.serializeUser()) 
passport.deserializeUser(user.deserializeUser());
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');
app.use((req,res,next)=>{
     res.locals.success=req.flash('success')
     res.locals.error=req.flash('error')
     res.locals.currUser=req.user;
     next()
})
app.listen(port,'0.0.0.0',()=>{console.log(`server Listening...${port}`)})
//root
app.get('/',(req,res)=>{
     res.redirect('/listings')
})
//for listings
let listingRouter=require('./routes/listing.js')
app.use('/listings',listingRouter)
//for reviews
let  reviewRouter=require('./routes/review.js')
app.use('/listings/:id/review',reviewRouter)
//for user
let userRouter=require('./routes/user.js')
app.use('/',userRouter)
//filter
let filterRouter=require('./routes/filter.js')
app.use('/',filterRouter);
//error
app.use((req,res,next)=>{
     throw new ExpressError(404,'page not found');
})
app.use((err,req,res,next)=>{
    let {status=408 ,message='Something went wrong'.toUpperCase()}=err;
     // res.status(status).render( "error.ejs",{message});
})
