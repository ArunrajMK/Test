

const { Router } = require("express");
const router = Router();
const {userModel} = require("../module/user.model");

router.post("/", async(req, res)=>{
    const {email, password, mobile, hospital_name, name} = req.body
    const result = await userModel.findOne({email})
    if(result){
        res.send({
            success:false,
            message:'Email already exist'
        })
    }else{
        const new_user = new userModel({
            email:email,
            password:password,
            name:name,
            hospital_name:hospital_name,
            mobile:mobile
        })
        await new_user.save()
        res.send({
            success:true,
            message:'Success'
        })
    }
})


module.exports = router;