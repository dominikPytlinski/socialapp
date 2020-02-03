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
    image: {
        type: String,
        default: 'http://localhost:4000/uploads/no-image.png'
    },
    role: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Role'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);