const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    binderID: {
        type: String, required: true, immutable: true, unique: true
    }, 
    userID:{
        type: String
    },
    binderName:{
        type: String
    },
    userName:{
        type: String
    },
    collectionCards: [String]
});

module.exports = mongoose.model('collectionBinder', collectionSchema);