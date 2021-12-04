const Message = require("../models/Message")
const Profile = require("../models/Profile")
const Channel = require("../models/Channel")

const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({});
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
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

        if(!userExist) channel.members.push(user._id);
        channel.messages.push(savedMessage._id);

        await Channel.updateOne(
            {id: data.currentChannel},
            {
                members: channel.members,
                messages: channel.messages
            }
        );

        const populatedMessage = await Message.findById(savedMessage._id).populate('sender');

        res.status(200).json(populatedMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json("Server Error");
    }
}

module.exports = {
    getMessages,
    newMessage
}