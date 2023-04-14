const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const phoneBookSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        unique: true,
        minlength: 3
    },
    number: {
        type: String, 
        required: true,
        minlength: 8
    },
    date: Date
});

phoneBookSchema.plugin(uniqueValidator);
phoneBookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString(),
        delete returnedObject._id,
        delete returnedObject._v,
        delete returnedObject.__v
    }
});

module.exports = mongoose.model('Phonebook', phoneBookSchema)