const mongoose = require('mongoose');

// Article Model
const article = mongoose.Schema({
    title: { type: String, required: true },
    text: {type: String, required: true}
});

// Export Module
module.exports = mongoose.model("Articles", article);