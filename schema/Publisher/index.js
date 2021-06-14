const mongoose = require('mongoose');
const publisher = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    shopName: {
        type: String,
    },
    phone: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isPublisher: {
        type: Boolean,
        required: true
    }
});


module.exports = mongoose.model('Publisher', publisher);