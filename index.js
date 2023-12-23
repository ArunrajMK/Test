const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const {connection} = require('./config/db');
const {userModel} = require("./module/user.model");
const {dataModal} = require("./module/data.model");
const signinRoutes = require('./routes/signin.routes');
const signupRoutes = require('./routes/signup.routes');
const homeRoutes = require('./routes/home.routes');
require("dotenv").config()

const PORT = process.env.PORT||8080
app.use(cors());
app.use(express.json());



app.use("/signup", signupRoutes);
app.use("/signin", signinRoutes);
app.use("/", homeRoutes);

app.listen(PORT,async()=>{
console.log("Listining to port 8080")

try{
    await connection
    console.log("Connected to db successfully")
}
catch(error){
    console.log("error connecting to db",error)
}

})