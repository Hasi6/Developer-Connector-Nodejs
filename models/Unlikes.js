const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UnlikesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = Unlikes = mongoose.model('unlikes', UnlikesSchema); 