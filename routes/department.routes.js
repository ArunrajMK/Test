const { Router } = require("express");
const {departmentModel} = require("../module/department.model");
const router = Router();

router.post("/", async(req, res)=>{
    const {description, department, incharge} = req.body 
    const new_user = new departmentModel({
        department:department,
        incharge:incharge,
        description:description

    })
    const result = await departmentModel.findOne({department})
    if(result){
        res.send({
            success:false,
            message:'Department already exist'
        })
    }else{
        await new_user.save()
        res.send({
        success:true,
        message:'Success'
    })}
})

router.get("/", async (req, res) => {
    const data = await departmentModel.find();
    res.send(data);
});


router.delete("/:id", async (req, res) => {
    const departmentId = req.params.id;

    try {
        const result = await departmentModel.findByIdAndDelete(departmentId);

        if (!result) {
            res.status(404).send({
                success: false,
                message: 'Department not found'
            });
        } else {
            res.send({
                success: true,
                message: 'Department deleted successfully'
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
});

module.exports = router;