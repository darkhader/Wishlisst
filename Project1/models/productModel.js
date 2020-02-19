const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String},
	image: { type: String, },
	address: { type: String, },
	price: { type: String  },
	date: {
		type: Date,
		default: Date.now
	},
	seller:[{type: String}],
	like:[{type: Schema.Types.ObjectId, ref: "User"}],
	review: [{type: Schema.Types.ObjectId, ref: "review"}]
});

module.exports = mongoose.model("product", productSchema);