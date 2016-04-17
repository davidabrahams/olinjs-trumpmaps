var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

// Create a Schema
var Trump = mongoose.Schema({
    name: String, // name of the trump
    img: Schema.Types.Mixed, // Is currently not being used -- now it is, right? or how are you storing the images?
    latLng: Schema.Types.Mixed, // LatLong obj
    comments: [String]
});

module.exports = mongoose.model("Trump", Trump);
