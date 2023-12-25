const { Router } = require("express");
const {serviceModel} = require("../module/service.model");
const router = Router();

router.post("/", async(req, res)=>{
    const {description, status, issue, assetId} = req.body 
    const new_service = new serviceModel({
        description:description,
        status:status,
        issue:issue,
        assetId:assetId
    })
        await new_service.save()
        res.send({
        success:true,
        message:'Success'
    })
})

router.get("/", async (req, res) => {
    const data = await serviceModel.find();
    res.send(data);
});


router.delete("/:id", async (req, res) => {
    const serviceId = req.params.id;
    try {
        const result = await serviceModel.findByIdAndDelete(serviceId);

        if (!result) {
            res.status(404).send({
                success: false,
                message: 'Service not found'
            });
        } else {
            res.send({
                success: true,
                message: 'Service deleted successfully'
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
});


router.patch("/:id", async (req, res) => {
    const serviceId = req.params.id;
    try {
        const existingService = await serviceModel.findById(serviceId);

        if (!existingService) {
            return res.status(404).send({
                success: false,
                message: 'Service not found'
            });
        }

        const { description, status, issue } = req.body;
        existingService.description = description;
        existingService.status = status;
        existingService.issue = issue;

        await existingService.save();

        res.send({
            success: true,
            message: 'Service updated successfully'
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
});



module.exports = router;