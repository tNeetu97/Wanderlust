let user=require('../models/user');
module.exports.signGet=(req,res)=>{
    res.render('./user/signup.ejs')
}
module.exports.signPost= async (req,res)=>{
    try{
        let {username,email,password}=req.body;
        let newUser=new user({
           email:email,
           username:username
     })
     let registerUser= await user.register(newUser,password)
      req.login(registerUser,(err)=>{
        if(err){
            next(err);
        }
        req.flash('success','Welcome to Wanderlust')
        res.redirect('/listings')
      })
    }catch(e){
        req.flash('error',e.message)
        res.redirect('/signup')}
}
module.exports.loginGet=(req,res)=>{
    res.render('./user/login.ejs')
}
module.exports.loginPost=async (req,res)=>{
     req.flash('success',"logged in successfully");
     let redirectUrl=res.locals.redirectUrl || '/listings';
     res.redirect(redirectUrl)
}
module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
         req.flash('success','user logout successfully');
         res.redirect('/listings');
    })
    
}