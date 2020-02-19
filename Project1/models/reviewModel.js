const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: "product" },
    userCmt: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    username: { type: String },
    name: { type: String },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});
module.exports = mongoose.model("review", reviewSchema);