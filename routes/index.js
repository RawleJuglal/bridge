var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var options = {
  	root: __dirname + '/build',
  	dotfiles: 'deny',
  	headers: {
  		'x-timestamp': Date.now(),
  		'x-sent':true
  	}
  };

  res.sendFile('index.html', options, function(err){
  	if(err){
  		next(err);
  	}
  });
});

module.exports = router;
