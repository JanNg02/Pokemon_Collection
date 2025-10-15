const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userID: {
        type: String, required: true, immutable: true, unique: true
    }, 
    email:{
        type: String
    },
    userName:{
        type: String
    },
    password:{
        type: String
    }
});

module.exports = mongoose.model('users', userSchema);