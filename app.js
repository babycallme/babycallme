var path = require('path');
var logger = require('morgan');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var app = express();
var t = require('twilio');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'codeweekend'}));
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes');
app.use('/', routes);