// Schema for shops

const mongoose = require("mongoose");


const shop = mongoose.Schema({
    shopName: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    email:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    location:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    regNo:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    GSTIN:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    locationOnGMap:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    address:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    phoneNo:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    bussinessWhatsappNo:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    date:{
        type: mongoose.SchemaTypes.Date,
        default: Date.now(),
    }
});


const Shop = module.exports = mongoose.model("Shops",shop);