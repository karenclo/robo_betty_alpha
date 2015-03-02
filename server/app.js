'use strict';

/*
 * Module dependencies.
 */
var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var path = require('path');
var mongoose = require('mongoose');
var socketIO = require('./socket/socket');

/*
 * MongoDb configuration.
 */
var config = require('./config/config');
var validate = require('./config/validation');

/*
 * Create Express server.
 */
var app = express();

/*
 * Create Socket.io server.
 */
var server = socketIO.createServer(app);

/*
 * Connect to MongoDB.
 */
mongoose.connect(config.mongoDBUrl);
mongoose.connection.on('connected', function() {
  console.log('MongoDB connected succesfully at: ' + config.mongoDBUrl);
});

mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});

/*
 * Express configuration.
 */
app.set('port', config.port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../dist')));


require('./routes')(app);

/*
 * DEPRECATED. Please move these routes to routes.js
 * and modify the ./routes files accordingly
 */
var user = require('./routes/user');
var product = require('./routes/product');
var theme = require('./routes/theme');
var auth = require('./routes/auth');


app.use('/auth', auth);
app.use('/api/*', validate);
app.use('/api', user);
app.use('/api', product);
app.use('/api', theme);

/*
 * Error Handler.
 */
app.use(errorHandler());

/*
 * Start Express server.
 */
 /*
app.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode',
    app.get('port'),
    app.get('env'));
	app.use(logger('dev'));
});*/

module.exports = app;
