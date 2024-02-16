const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email:{type:String,require:true},
    password:{type:String,require:true},
    name:{type:String,require:false},
    mobile:{type:String,require:false},
    hospital_name:{type:String,require:false}
})

const userModel = mongoose.model("userTest", userSchema)
module.exports = {userModel}