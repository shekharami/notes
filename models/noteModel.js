const mongoose = require('mongoose');

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
    }

}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}) 


const Notes = mongoose.model('Notes',notesSchema );

module.exports = Notes;