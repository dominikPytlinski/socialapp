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
    roleId: {
        type: String,
        required: true,
        ref: 'Role'
    }
});

module.exports = mongoose.model('User', userSchema);