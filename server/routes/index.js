var express = require('express');
var path = require('path');
var router = express.Router();
var Trump = require('../models/trump');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
});

/* GET all trumps in the world. */
router.get('/api/trump', function (req, res, next) {
  Trump.find(function (err, topics) {res.json(topics)});
});

/* POST a new trump to the DB */
router.post('/api/trump', function(req, res, next) {
  var name = req.body.name;
  var img = req.body.img;
  var lat = req.body.lat;
  var lon = req.body.lon;

  Trump.create({ name: name, img:img, lat:lat, lon:lon}, function (err, trump) {
    if (err) return res.status(500).
      send('An error occurred when creating the new trump.');
    Trump.find(function (err, trumps) {res.json(trumps)});
  });
  
});

module.exports = router;
