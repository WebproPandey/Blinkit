const  express =  require("express")
const  app =  express()
const  path = require("path")
const  IndexRoutes =  require("./routes/indexroutes")
const  UserRoutes =  require("./routes/userroutes")
const  ProductRoutes =  require("./routes/productsroutes")
const  AdminRoutes =  require("./routes/adminroutes")





app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/" , IndexRoutes)
app.use("/user" , UserRoutes)
app.use("/products" , ProductRoutes)
app.use("/admin" , AdminRoutes)

app.listen(3000 , () => console.log("Server is running on https://localhost:3000"))