const mongoose = require('mongoose');

const textSchema = new mongoose.Schema({
    id: {type : String, required : true},
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 900 } 
});

module.exports = mongoose.model('Text', textSchema);
