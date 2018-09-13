const mongoose = require('mongoose');

const userScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
    },

    myWeddings: {
        type: [String],
        default: []
    },
    guestWeddings: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model('User', userScheme);