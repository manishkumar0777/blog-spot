const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();

const PORT = process.env.PORT || 8000;
const app = express();

//view engine
app.set("view engine" , "ejs");
app.set("views", path.resolve("./views"));

//routes
app.get("/" , (req , res) => {
    return res.render("home");
})


//starting server
app.listen(PORT, () => {console.log("server started")})