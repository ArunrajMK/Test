const { Router } = require("express");
const {assetModel} = require("../module/asset.model");
const router = Router();

router.post("/", async(req, res)=>{
    const {asset_name, brand, service, department} = req.body 
    const new_asset = new assetModel({
        department:department,
        asset_name:asset_name,
        brand:brand,
        service:service
    })
    const result = await assetModel.findOne({asset_name})
    if(result){
        res.send({
            success:false,
            message:'Asset already exist'
        })
    }else{
        await new_asset.save()
        res.send({
        success:true,
        message:'Success'
    })}
})

router.get("/", async (req, res) => {
    const data = await assetModel.find();
    res.send(data);
});


router.get("/:id", async (req, res) => {
    const assetId = req.params.id;
    try{
        const result = await assetModel.findById(assetId);
        if (!result) {
            res.status(404).send({
                success: false,
                message: 'Asset not found'
            });
        } else {
            res.send(result);
        }
        
    }catch(error) {
        res.status(500).send({
            success: false,
            message: 'Internal Server Error'
        });
    }
    
});






router.delete("/:id", async (req, res) => {
    const assetId = req.params.id;
    try {
        const result = await assetModel.findByIdAndDelete(assetId);

        if (!result) {
            res.status(404).send({
                success: false,
                message: 'Asset not found'
            });
        } else {
            res.send({
                success: true,
                message: 'Asset deleted successfully'
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