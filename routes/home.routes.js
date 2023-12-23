const { Router } = require("express");
const {dataModal} = require("../module/data.model");
const router = Router();

router.post("/", async(req, res)=>{
    const {name, age} = req.body 
    const new_user = new dataModal({
        name:name,
        age:age
    })
    const result = await dataModal.findOne({name})
    if(result){
        res.send({success:true,
            message:'Name already exist'
        })
    }else{
        await new_user.save()
        res.send({
        success:true,
        message:'Success'
    })}
})

router.get("/", async (req, res) => {
    const data = await dataModal.find();
    res.send(data);
});


module.exports = router;