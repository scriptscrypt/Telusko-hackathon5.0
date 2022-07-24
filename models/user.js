const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'username cannot be blank']
    },
    password:{
        type: String,
        required: [true, 'password cannot be blank']
    },
    userType:{
        type:String,
        required: [true, 'usertype cannot be blank']
    }
})

module.exports = mongoose.model('User', userSchema);
