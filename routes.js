var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res) {
  return res.render('index', {
    title: 'Baby Call Me'
  });
});

router.post('/create', function(req, res) {
  if(req.body.num) {
    fs.appendFile('db.txt',req.body.num, function(err) {
      if(err) throw err;
    });
  }
  res.redirect('/');
});

module.exports = router;
