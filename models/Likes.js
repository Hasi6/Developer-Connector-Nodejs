const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LikesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = Likes = mongoose.model('likes', LikesSchema); 