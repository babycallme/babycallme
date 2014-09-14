var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res) {
  return res.render('index', {
    title: 'babycall.me'
  });
});

router.post('/create', function(req, res) {
  if(!req.body.num || !req.body.mins || !req.body.tim) {
  	res.redirect('/') //put a proper error message here
  }
  else if(req.body.num.length!=10) {
  	res.redirect('/') //put a proper error message here
  }
  else {
    fs.appendFile('data/numbers.txt',req.body.num.concat('\n'), function(err) {
      if(err) throw err;
    });
    fs.appendFile('data/time.txt',req.body.tim.concat('\n'), function(err) {
      if(err) throw err;
    });
    fs.appendFile('data/minutes.txt',req.body.mins.concat('\n'), function(err) {
      if(err) throw err;
    });
  }
  res.redirect('/'); //put a successful message here
});

module.exports = router;
