const mongoose = require('mongoose');
const departmentSchema = new mongoose.Schema({
    department:{type:String,require:true},
    incharge:{type:String,require:true},
    description:{type:String,require:true}
})

const departmentModel = mongoose.model("departmentData", departmentSchema)
module.exports = {departmentModel}