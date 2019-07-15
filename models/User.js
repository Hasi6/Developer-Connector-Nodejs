const randomString = require('randomstring');
const mongoose = require('mongoose');

const token = randomString.generate();

const UsersSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    birthDay:{
        type: Date,
        required: true
    },
    signInDate:{
        type: Date,
        default: Date.now
    },
    confirmed: {
        type: Boolean,
        default:false
    },
    userToken:{
        type: String,
        default: token
    },
    profilePic: {
        type: String,
        default:"/images/profile.png"
    },
    coverPic: {
        type: String,
        default:"/images/cover.jpg"
    }
});

const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;