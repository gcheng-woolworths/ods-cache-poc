const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampaignMetaSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = CampaignMeta = mongoose.model('CampaignMeta', CampaignMetaSchema);
