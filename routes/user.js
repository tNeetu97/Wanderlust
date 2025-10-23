let express=require('express');
let router=express.Router();
let user=require('../models/user.js');
let passport=require('passport');
let userControl=require('../controller/user.js');
let {saveRedirectUrl}=require('../middleware.js')
//signUp-start
router.route('/signup')
.get(userControl.signGet)
.post(userControl.signPost)
//signUp-end
//login-start
router.route('/login')
.get(userControl.loginGet)
.post( saveRedirectUrl,passport.authenticate('local',{failureRedirect:'/login',failureFlash:true}), userControl.loginPost)
//login-end
//logout
router.get('/logout',userControl.logout)
module.exports=router;