const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nickName: {
        type: String,
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Role'
    }
});

module.exports = mongoose.model('User', userSchema);