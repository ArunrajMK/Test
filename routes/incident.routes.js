const { Router } = require("express");
const {incidentModel} = require("../module/incident.model");
const router = Router();

router.post("/", async(req, res)=>{
    const {description, status, issue, assetId} = req.body 
    const new_incident = new incidentModel({
        description:description,
        status:status,
        issue:issue,
        assetId:assetId
    })
        await new_incident.save()
        res.send({
        success:true,
        message:'Success'
    })
})

router.get("/", async (req, res) => {
    const data = await incidentModel.find();
    res.send(data);
});


router.delete("/:id", async (req, res) => {
    const incidentId = req.params.id;
    try {
        const result = await incidentModel.findByIdAndDelete(incidentId);

        if (!result) {
            res.status(404).send({
                success: false,
                message: 'Incident not found'
            });
        } else {
            res.send({
                success: true,
                message: 'Incident deleted successfully'
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
    const incidentId = req.params.id;
    try {
        const existingIncident = await incidentModel.findById(incidentId);

        if (!existingIncident) {
            return res.status(404).send({
                success: false,
                message: 'Incident not found'
            });
        }

        const { description, status, issue } = req.body;
        existingIncident.description = description;
        existingIncident.status = status;
        existingIncident.issue = issue;

        await existingIncident.save();

        res.send({
            success: true,
            message: 'Incident updated successfully'
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
});



module.exports = router;