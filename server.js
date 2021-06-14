const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const auth = require("./Routes/auth");
const profile = require('./Routes/profile');
const books = require("./Routes/RoutesModifyDB/Book");
const shops = require("./Routes/RoutesModifyDB/shop");
const middleware = require("./middleware/");
const mongoPromises = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};



mongoose.connect(process.env.DB_URI, mongoPromises, () => {
    console.log("connected to db");
});
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/user", profile);
app.use("/api/users", middleware.isAlreadyloggedin, auth);
app.use("/api", books);
app.use("/api", shops);
//app.use("/*",(req,res)=>res.send(`<h1>welcome to pustalk APIs <h1>`))
app.listen(process.env.PORT, () => {
    console.log("the server is up on PORT " + process.env.PORT);
});