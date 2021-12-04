require('dotenv').config();
const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;


const connectDB = async () => {
    try {
        await mongoose.connect(uri);

        console.log('Mongoose is connected...');
    } catch (error) {
            console.error(error);
            process.exit(1);
    }
}

const db = mongoose.connection;



module.exports = { connectDB, db };