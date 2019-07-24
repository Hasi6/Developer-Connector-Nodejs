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
    },
    company: {
        type: String
      },
      website: {
        type: String
      },
      location: {
        type: String
      },
      status: {
        type: String,
      },
      skills: {
        type: [String],
      },
      bio: {
        type: String
      },
      githubusername: {
        type: String
      },
      exprience: [
        {
          title: {
            type: String,
            required: true
          },
          company:{
              type: String,
              required: true
          },
          country: {
              type: String,
              required: true
          },
          from:{
              type: Date,
              required: true
          },
          to:{
            type: Date,
            required: true
          },
          description: {
              type: String,
              required: true
          }
        }
      ],
      education: [
        {
          school: {
            type: String,
            required: true
          },
          degree: {
            type: String,
            required: true
          },
          fieldofstudy: {
            type: String,
            required: true
          },
          from: {
            type: Date,
            required: true
          },
          to: {
            type: Date
          },
          description: {
            type: String
          }
        }
      ],
      social: {
        youtube: {
          type: String
        },
        twitter: {
          type: String
        },
        facebook: {
          type: String
        },
        linkedin: {
          type: String
        },
        instagram: {
          type: String
        }
      }
});

const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;