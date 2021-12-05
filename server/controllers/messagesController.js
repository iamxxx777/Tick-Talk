const Message = require("../models/Message")
const Profile = require("../models/Profile")
const Channel = require("../models/Channel")

const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({});
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json("Server Error");
    }
}

const newMessage = async (req, res) => {
    try {
        const data = req.body;
        const user = await Profile.findOne({fireId: data.uid});
        let channel = await Channel.findById(data.currentChannel);

        const newMessage = new Message({
            channel: data.currentChannel,
            text: data.msg,
            sender: user._id
        });

        const savedMessage = await newMessage.save();

        const userExist = channel.members.includes(user._id);

        var newMembers, newMessages;

        if(!userExist) newMembers = [...channel.members, user._id]
        newMessages = [...channel.messages, savedMessage._id]

        await Channel.findByIdAndUpdate(data.currentChannel, {$set: {members: newMembers, messages: newMessages}}, {new: true})

        const populatedMessage = await Message.findById(savedMessage._id).populate('sender');

        const response = {
            message: populatedMessage,
            user: !userExist ? user : null
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json("Server Error");
    }
}

module.exports = {
    getMessages,
    newMessage
}