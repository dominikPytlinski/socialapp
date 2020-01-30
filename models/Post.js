const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    likes: {
        type: [Schema.Types.ObjectId],
        default: []
    },
    comments: {
        type: [Schema.Types.ObjectId],
        default: [],
        ref: 'Comment'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);