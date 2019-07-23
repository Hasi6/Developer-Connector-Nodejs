const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    likes:[
        {
            user:{
                type: Schema.Types.ObjectId,
                required: true
            }
        }
    ],
    unlikes:[
        {
            user:{
                type: Schema.Types.ObjectId,
                required: true
            }
        }
    ],
    comments: [
        {
            user:{
                type: String,
                required: true
            },
            userId: {
                type: Schema.Types.ObjectId,
                required: true
            },
            postId: {
                type: Schema.Types.ObjectId,
                required: true
            },
            userImage:{
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            date:{
                type: Date,
                default: Date.now
            } 
        }
    ],
    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = Post = mongoose.model('post', PostSchema); 