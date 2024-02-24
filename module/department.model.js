const mongoose = require('mongoose');
const departmentSchema = new mongoose.Schema({
    firm_name: { type: String, required: true },
    firm_type: { type: String, required: true },
    location: { type: String, required: true },
    employee_count: { type: String, required: true },
    resque_vehicle: { type: String, required: true },
    timings: { type: String, required: true },
    name: { type: String, required: true},
    mobile:{ type: String, required: true},
    email: { type: String, required: true},
    depart_id: { type: String, required: true },
    proof: {
        aadhar_image_url: { type: String, required: true },
        aadhar_image_id: { type: String, required: true },
        licence_number: { type: String, required: true },
        licence_image_url: { type: String, required: true },
        licence_image_id: { type: String, required: true }
    }
});
const departmentModel = mongoose.model("departmentData", departmentSchema)
module.exports = {departmentModel}