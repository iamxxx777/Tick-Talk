const Profile = require("../models/Profile");
const cloudinaryV = require("../config/cloudinary");

const getAllProfiles = async (req, res) => {
    try {
        const users = await Profile.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({err: "Server Error"});
    }
}

const getProfile = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await Profile.findOne({fireId: id});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({err: "Server Error"});
    }
}

const createProfile = async (req, res) => {
    const { user, name } = req.body;

    const schema = {
        fireId: user.uid,
        name: name,
        email: user.email
    }

    try {
        const profileExist = await Profile.findOne({fireId: user.uid});
        if(!profileExist) {
            const newProfile = new Profile(schema);
            await newProfile.save();
            res.status(201).json({photo: newProfile.photo});
        }
    } catch (error) {
        res.status(500).json({err: "Server Error"});
    }
}

const updateProfile = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user = await Profile.findById(id);

        if(!user) {
            res.status(200).json({error: "User does not exist"});
        }

        Profile.findByIdAndUpdate(id, {$set: data}, {new: true}, (err, doc) => {
            if(err) {
              console.error(err);
              res.status(500).json({error: "Server Error"});
            } else {
                res.json({success: true});
            }
        });

    } catch(error) {
        res.status(500).json({err: "Server Error"});
    }
}

const updateImage = async (req, res) => {
    const data = req.body;

    try {
        const user = await Profile.findById(data.id);

        if(!user) {
          return res.status(200).json({error: "User does not exist"});
        }

        var newData = {};

        if(req.file) {
            if (data.cloudId) {
              // delete former image from the cloudbase
              await cloudinaryV.uploader.destroy(data.cloudId);
            }

            const result = await cloudinaryV.uploader.upload(req.file.path);

            if (result.secure_url) {
                newData.image = result.secure_url;
                newData.cloudId = result.public_id;
            }
        }

        Profile.findByIdAndUpdate(data.id, {photo: newData.image, cloudId: newData.cloudId}, {new: true}, (err, doc) => {
              if(err) {
                console.error(err);
                res.status(500).json({error: "Server Error"});
              } else {
                  res.json({success: true, url: newData.image});
              }
        });

    } catch (error) {
        res.status(500).json(error);
    }
}



module.exports = {
    createProfile,
    getProfile,
    getAllProfiles,
    updateImage,
    updateProfile
};