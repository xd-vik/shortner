const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
    longUrl : String,
    shortUrl : String,
})

module.exports = mongoose.model("shortUrl", linkSchema);