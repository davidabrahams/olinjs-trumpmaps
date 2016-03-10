var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

// Create a Schema
var Trump = mongoose.Schema({
    name: String, // name of the trump
    img: Schema.Types.Mixed, // As of now, a url %TODO: change it?
    latLng: Schema.Types.Mixed, // LatLong obj
    comments: [String]
});

module.exports = mongoose.model("Trump", Trump);
