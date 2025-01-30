const mongoose = require('mongoose');
const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();

const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');  


const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const Blog = require("./models/blog");


mongoose.connect(process.env.MONGO_URL)
.then(() => {console.log("db connected")})

const PORT = process.env.PORT || 4000;
const app = express();

//routers
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");



//view engine
app.set("view engine" , "ejs");
app.set("views", path.resolve("./views"));

//middelware
app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')))

//routes
app.use("/user" , userRoutes);
app.get("/" , async (req , res) => {
    const allBlogs = await Blog.find({});
    return res.render("home", {
        user : req.user,
        blogs : allBlogs,
    });
});

app.use("/blog", blogRoutes);



//starting server
app.listen(PORT, () => {console.log("server started")})