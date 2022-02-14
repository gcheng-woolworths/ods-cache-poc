const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  parentIdentifier: {
    type: String,
    required: true
  },
  externalReference: {
    type: String,
    required: true
  },
	address1: String,
	address2: String,
	address3: String,
  country: String,
  postcode: String,
  phone: String,
  incomingIdentifier: String,
  outgoingIdentifier: String,
  tags: [{type: String}]
});

module.exports = Store = mongoose.model('Store', StoreSchema);
