
const mongoose = require('mongoose');
const { serviceSchema } = require('./service.model'); 

const assetSchema = new mongoose.Schema({
    asset_id: { type: String, require: true },
    department: { type: String, require: true },
    services: [serviceSchema]
});

const assetModel = mongoose.model("assetData", assetSchema);
module.exports = { assetModel };