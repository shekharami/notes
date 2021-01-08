const mongoose = require('mongoose');
const User = require('./userModel');

const notesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You should provide your name']
    },

    email: {
        type: String,
        required: [true, 'you must provide an email']
    },

    item: {
        type: String,
        required: [true, 'Please provide note  item']
    },

    createdAt:{
        type: Date,
        default: Date.now()
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: User
        //,required: [true,'A note must be written by someone']  /// enable this when the page is created
    }

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}) 


const Notes = mongoose.model('Notes',notesSchema );

module.exports = Notes;