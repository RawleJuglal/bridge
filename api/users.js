var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('express-jwt');

var User = mongoose.model('User');

var auth = jwt({secret: 'R3l3ntl3$$', userProperty: 'payload'});

router.get('/', function(req, res, next){
	res.json({success:true, message:'You are in the users routes'});
});

router.post('/register', function(req, res, next){
	if(!req.body.username || !req.body.password){
		return res.status(400).json({success:false, message:'Please fill out all fields'});
	}

	var user = new User();
	user.username = req.body.username;
	user.setPassword(req.body.password);

	user.save(function(err, user){
		if(err){return next(err);}

		return res.json({success:true, message:'New User Created', token:user.generateJWT()});
	});
});

router.post('/login', function(req, res, next){
	if(!req.body.username || !req.body.password){
		return res.status(400).json({success:false, message:'Please fill out all fields'});
	}

	passport.authenticate('local', function(err, user, info){
		if(err){return next(err);}

		if(user){
			console.log('i have a user');
			return res.json({success:true, message:'This user is authenticated', token:user.generateJWT()});
		} else {
			console.log('I did not find a user');
			return res.json(info);
		}
	})(req, res, next);
});


module.exports = router;