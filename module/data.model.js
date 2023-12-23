const mongoose = require('mongoose');
const dataSchema = new mongoose.Schema({
    name:{type:String,require:true},
    age:{type:String,require:true}
})

const dataModal = mongoose.model("accData", dataSchema)
module.exports = {dataModal}