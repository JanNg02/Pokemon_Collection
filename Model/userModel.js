const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: {
        type: String, required: true, immutable: true, unique: true
    }, 
    userName:{
        type: String
    },
    password:{
        type: String
    }
});

module.exports = mongoose.model('users', userSchema);