const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    target: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Like', likeSchema);