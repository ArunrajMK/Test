const mongoose = require('mongoose');
const serviceSchema = new mongoose.Schema({
    issue:{type:String,require:true},
    status:{type:String,require:true},
    description:{type:String,require:true}
})

const serviceModel = mongoose.model("serviceData", serviceSchema)
module.exports = {serviceModel}