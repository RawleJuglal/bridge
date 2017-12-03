var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var multer = require('multer');
// var GridFsStorage = require('multer-gridfs-storage');
// var Grid = require('gridfs-stream');
// Grid.mongo = mongoose.mongo;

require('./models/Users');
require('./models/Posts');
require('./models/Resumes');
require('./config/passport');

var index = require('./routes/index');
var users = require('./api/users');
var posts = require('./api/posts');
var resumes = require('./api/resumes');

mongoose.Promise = global.Promise;

var app = express();


//OPEN MLABS DATABASE//
if (!process.env.MONGODB_URI) {
  var mongoUri = 'mongodb://heroku_qcfnlfsn:shmrtnogm81jjotr8j5hs6srn8@ds125556.mlab.com:25556/heroku_qcfnlfsn'
} else {
  var mongoUri = process.env.MONGODB_URI
}

// var conn = mongoose.createConnection(mongoUri, { useMongoClient: true });



// conn.on('error', console.error.bind(console, 'connection error:'))

// conn.once('open', function(){
// 	var gfs = Grid(conn.db, mongoose.mongo);
// 	console.log('Made connection to database');
// });

mongoose.connect(mongoUri, { useMongoClient: true })

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', dbCallback)

function dbCallback() {
  console.log('db connection made!')
}

// view engine setup
app.set('views', path.join(__dirname, 'build'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
    limit: '5mb',
    parameterLimit: 100000,
    extended: false 
}));

app.use(bodyParser.json({
    limit: '5mb'
}));

/** Seting up server to accept cross-origin browser requests */
app.use(function(req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// var storage = GridFsStorage({
// 	url:mongoUri,
// 	filename: function(req, file, cb){
// 		var datetimestamp = Date.now();
// 		return new Promise((resolve, reject) => {
// 			if(err){
// 				return reject(err);
// 			}
// 			var fileInfo = {
// 				chunkSize:1024
// 			}
// 			resolve(fileInfo);
// 		})
// 		cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
// 	},
// 	root: 'ctFiles' //root name for collection to store files into
// });

// var upload = multer({ //multer settings for single upload
// 	storage: storage
// }).single('file');

app.use('/', index);
app.use('/users', users);
app.use('/posts', posts);
app.use('/resumes', resumes);

app.use('/dist', express.static(__dirname + '/build'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
