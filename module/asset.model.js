
const mongoose = require('mongoose');
const { serviceModel } = require('./service.model'); 

const assetSchema = new mongoose.Schema({
    asset_name: { type: String, require: true },
    brand: { type: String, require: true },
    department: { type: String, require: true },
    service: [serviceModel.schema]
});

const assetModel = mongoose.model("assetData", assetSchema);
module.exports = { assetModel };