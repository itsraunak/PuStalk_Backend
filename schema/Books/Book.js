// Schema books 
const mongoose = require("mongoose");


const book = mongoose.Schema({
    bookName:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    author:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    isbn:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    mrp:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    publisher:{
        type: mongoose.SchemaTypes.String,//[mongoose.SchemaTypes.ObjectId],
        required: true,
    },
    pages:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    date:{
        type: mongoose.SchemaTypes.Date,
        default: Date.now(),
    },
    catagory:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    imageUrl:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    coverType:{
        type: mongoose.SchemaTypes.String,
        required: true,
    }
});

const Book = module.exports = mongoose.model("Books" , book);