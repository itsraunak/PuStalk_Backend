const mongoose = require("mongoose");
const user = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    password:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    acceptedPrivacyTerms:{
        type: mongoose.SchemaTypes.Boolean,
        default: true,
    },
    date:{
        type: mongoose.SchemaTypes.Date,
        default: Date.now(),
    }
});

const User = module.exports = mongoose.model("Users",user);