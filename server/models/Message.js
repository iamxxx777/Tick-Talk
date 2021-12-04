const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    channel: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Channel"
    },
    text: {
        type: String,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    }
}, {timestamps: true});


module.exports = mongoose.models.Message || mongoose.model('Message', messageSchema);
