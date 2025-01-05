const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/blog-spot")
.then(() => {console.log("db connected")})

const PORT = process.env.PORT || 8000;
const app = express();

//routers
const userRoutes = require("./routes/user");

//view engine
app.set("view engine" , "ejs");
app.set("views", path.resolve("./views"));

//middelware
app.use(express.urlencoded({extended : false}));

//routes
app.use("/user" , userRoutes);
app.get("/" , (req , res) => {
    return res.render("home");
})


//starting server
app.listen(PORT, () => {console.log("server started")})