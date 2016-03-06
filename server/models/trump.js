var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

// Create a Schema
var Trump = mongoose.Schema({
    name: String, // name of the article
    img: String, // As of now, a url %TODO: change it?
    lat: Number, // Latitude
    lon: Number // Longitude
});

module.exports = mongoose.model("Trump", Trump);