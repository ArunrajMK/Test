

const { Router } = require("express");
const router = Router();
const {userModel} = require("../module/user.model");

router.post("/", async(req, res)=>{
    const {email, password, mobile, firm_name, name} = req.body
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
            firm_name:firm_name,
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