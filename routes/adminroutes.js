const  express =  require("express")
const  router =  express.Router()

router.get("/" , (req,res) =>{
    res.render("admin_create")
})
router.post('/create', async (req, res) => {

        try {
          let admin = await adminModel.find()
          if(admin.length > 0) {
              return res
              .status(503)
              .send("you don't havev permission to create a new owner.")
          }
            let{name , email ,password , role} =  req.body

            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash("admin", salt); 

            let createadmin = await  adminModel.create({
                name,
                email,
                password: hash,
                role:"admin"
            });

            let token = jwt.sign({ email , admin:true}, process.env.JWT_KEY);
            res.cookie("token", token);
            res.redirect("/admin/dashboard");
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
});


router.get('/login', (req, res) => {
    res.render("admin_login")
})
router.post('/login', async (req, res) => {
  let {email , password} = req.body
   
  let admin = await adminModel.findOne({email})
  if(!admin)  return res.send("user not found")
    let isMatch = await bcrypt.compare(password, admin.password)
    if(isMatch){
        let token = jwt.sign({ email:"johndoe@example.com"  , admin:true}, process.env.JWT_KEY);
        res.cookie("token", token);
        res.redirect("/admin/dashboard")
    }


})

module.exports =  router