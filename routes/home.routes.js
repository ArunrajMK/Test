const { Router } = require("express");
const {dataModal} = require("./module/data.model");
const home = Router();


home.post("/", async(req, res)=>{
const {name, age} = req.body 

const new_user = new dataModal({
    name:name,
    age:age
})
await new_user.save()
const result = await userModel.findOne({name})
if(result){
    res.send("Name already exist")
}else{res.send({
    success:true,
    message:'Success'
})}




})




module.exports = home;