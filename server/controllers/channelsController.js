const Channel = require("../models/Channel");
const Profile = require('../models/Profile');

const createChannel = async (req, res) => {
    try {
        const { name, description, uid } = req.body;
        const user = await Profile.findOne({fireId: uid});

        if(!user) {
            res.status(401).json({err: "user does not exist"});
        } else {
            const newChannel = new Channel({
                name,
                description,
                members: [user._id],
                messages: []
            });
    
            await newChannel.save();
    
            const channel = await newChannel.populate("members", "name photo" )
    
            res.status(200).json(channel);      
        }
    } catch(error) {
        console.error(error);
        res.status(500).json('Server error');
    }
    
}

const getChannel = async (req, res) => {
    try {
        const id = req.params.id;

        if(!id) {
            res.status(400).json("id not specified");
        } else {
            const data = await Channel.findById(id)
                                .populate('members', 'name photo')
                                .populate('messages');            
        
            const channel = await Profile.populate(data, { path: "messages.sender" });

            res.status(200).json(channel);
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
    
}


// const getWelcomeChannel = async (req, res) => {
//     try {
//         const name = "Welcome Channel";
//         const data = await Channel.findOne({name})
//                             .populate('members', 'name photo')
//                             .populate('messages');
        
//         console.log(data);
        
        
//         const channel = await Profile.populate(data, { path: "messages.sender" });

//         res.status(200).json(channel);
        
//     } catch (error) {
//         console.error(error);
//         res.status(500).json("Server error");
//     }
// }

const getAllChannels = async (req, res) => {
    try {
        const data = await Channel.find({})
                                .populate('members', 'name photo')
                                .populate('messages');
        
        const channels = await Profile.populate(data, { path: "messages.sender" });

        res.status(200).json(channels);
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
}




module.exports = {
    createChannel,
    getChannel,
    getAllChannels
}