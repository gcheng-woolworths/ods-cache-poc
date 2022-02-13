const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartnerSchema = new Schema({
  partnerId: String,
  name: String,
});

module.exports = Partner = mongoose.model('Partner', PartnerSchema);
