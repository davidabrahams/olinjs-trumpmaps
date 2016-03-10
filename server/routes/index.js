var express = require('express');
var path = require('path');
var router = express.Router();
var Trump = require('../models/trump');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: path.join(__dirname, '../views') });
});

/* GET all trumps in the world. */
router.get('/api/trump', loggedIn, function (req, res, next) {
  Trump.find(function (err, trumps) {
    res.json(trumps)});
});

/* POST a new trump to the DB */
router.post('/api/trump', loggedIn, function(req, res, next) {
  var name = req.body.name;
  var img = req.body.img;
  var latLng = req.body.latLng;
  Trump.create({ name: name, img:img, latLng:latLng}, function (err, trump) {
    if (err) return res.status(500).
      send('An error occurred when creating the new trump.');
    Trump.find(function (err, trumps) {res.json(trumps)});
  });
});

router.post('/api/trump/comment', loggedIn, function (req, res, next) {
  if (req.body.id && req.body.comment) {
    Trump.findByIdAndUpdate(req.body.id, {$push: {comments: req.body.comment}},
      {safe: true, upsert: true}, function(err, model) {
        if (err) return res.status(500).
          send('An error occurred when adding a comment.');
        Trump.find(function (err, trumps) {res.json(trumps)});
      });
  }
});

// Passport stuff
router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/' })
);

router.get('/loggedin', function(req, res, next) {
  res.json(req.user);
});

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.status(403).send();
    }
}

module.exports = router;
