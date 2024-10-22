const  express =  require("express")
const  router =  express.Router()
const  passport =  require("passport")
const  {userModel , validateUser} = require("../models/user-models")

router.get("/login",(req,res)=>{
    res.render("user_login")
 })
 router.get("/profile" , (req,res)=>{
    res.send("profile page")
 })
  

router.get("/logout",(req,res , next )=>{
    req.logout(function(err) {
        if (err) {
             return next(err)
        }
        req.session.destroy((err) =>{
            if(err){
                return console.log(err)
            }
            res.clearCookie('connect.sid');
            res.redirect("/users/login")
        })
         
   
    }); 

})
  

module.exports =  router