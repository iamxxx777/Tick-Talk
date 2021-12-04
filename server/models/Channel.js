const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const channelSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: "Profile",
            required: true,
        }
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: "Message",
            required: true,
        }
    ]
});


module.exports = mongoose.models.Channel || mongoose.model('Channel', channelSchema);