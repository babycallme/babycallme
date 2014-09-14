var path = require('path');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var app = express();
var t = require('twilio');
var fs = require('fs');
var readline = require('readline');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'codeweekend'}));
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes');
app.use('/', routes);

var accountSid = 'ACb2bb038c0b235b0dba5555aedd76d312';
var authToken = '3754198e5cc4d0231ef4ba57ea9ee06d';
var client = require('twilio')(accountSid, authToken);

var rd = readline.createInterface({
    input: fs.createReadStream('data/time.txt'),
    output: process.stdout,
    terminal: false
});

setInterval(function() {
	var date = new Date();
	var hours = date.getHours().toString();
	var minutes = date.getMinutes().toString();

	if(hours.length!=2) hours = "0".concat(hours);
	if(minutes.length!=2) minutes = "0".concat(minutes);

	var time = hours.concat(':').concat(minutes);

	console.log(time);

	rd.on('line', function(line) {
    	console.log(line);
		if(line==time) {
			client.calls.create({
			    to: "+18184066164",
			    from: "+18184854928",
			    url: 'https://demo.twilio.com/welcome/voice/' // need better recording
			}, function(err) {
			    console.log(err)
			});
		}
	});
}, 30000);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Handle any errors by rendering the error page
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    errorMessage: err.message,
    error: app.get('env') === 'development' ? err : {}
  });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});