const mongoose = require('mongoose');
const serviceSchema = new mongoose.Schema({
    service_id:{type:String,require:true},
    issue:{type:String,require:true},
    status:{type:String,require:true}
})

const serviceModel = mongoose.model("serviceData", serviceSchema)
module.exports = {serviceModel}