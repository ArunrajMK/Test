const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const {connection} = require('./config/db');
const {userModel} = require("./module/user.model");
const PORT = process.env.atlus_URL

app.use(express.json());


app.get("/", (req, res)=>{
    res.send("Reached Home route")
})

app.post("/signup", async(req, res)=>{
    const {email, password} = req.body
    const result = await userModel.findOne({email})
    if(result){
        res.send("Email already exist")
    }else{
        const new_user = new userModel({
            email:email,
            password:password
        })
        await new_user.save()
        res.send({
            success:true,
            message:'Success'
        })
    }
})



app.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password });
    if (user) {
        const secretKey = 'your-secret-key'; 
        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' }); 
        res.json({ message: 'Login Success', token });
    } else {
        res.status(401).json({ message: 'Login failed' });
    }
});




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