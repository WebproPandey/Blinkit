const  express =  require("express")
const  router =  express.Router()

router.get("/" ,(req , res)=>{
    res.send("hello index page")
})

module.exports =  router