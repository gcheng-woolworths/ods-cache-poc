const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');
const Schema = mongoose.Schema;

const ReasonSchema = new Schema({
  reasonCode: {
    type: String,
    required: true
  },
  partnerId: String,
  divisionNumber: String,
  divisionName: String,
  otherLogic: String,
  icon: String,
  transactionType: String,
  description: {
    type: String,
    required: true
  },
  comment: String
});

module.exports = Reason = mongoose.model('Reason', ReasonSchema);
