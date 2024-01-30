const mongoose = require('mongoose');
const incidentSchema = new mongoose.Schema({
    issue:{type:String,require:true},
    status:{type:String,require:true},
    description:{type:String,require:true},
    assetId:{type:String,require:true}
})

const incidentModel = mongoose.model("incidentSchema", incidentSchema)
module.exports = {incidentModel}