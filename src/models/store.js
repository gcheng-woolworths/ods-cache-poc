const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Store = mongoose.model('Store', StoreSchema);
