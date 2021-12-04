const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: 'John Doe'
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    photo: {
        type: String,
        required: true,
        default: "https://res.cloudinary.com/iamxxx777/image/upload/v1626707838/hlwtoipgbjgim8pdelgr.jpg",
    },
    cloudId: {
        type: String,
    },
    phone: {
        type: String,
    },
    bio: {
        type: String,
    },
    fireId: {
        type: String,
        required: true,
    }
}, {timestamps: true});



module.exports = mongoose.models.Profile || mongoose.model('Profile', profileSchema);