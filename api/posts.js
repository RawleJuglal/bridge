var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

router.get('/', function(req, res, next){
	res.json({success:true, message:'You are in the posts routes'});
});

router.post('/entry', function(req, res, next){
	var post = new Post(req.body);

	post.save(function(err, post){
		if(err){return next(err);}

		res.json(post);
	});
});

router.get('/all', function(req, res, next){
	Post.find(function(err, posts){
		if(err){return next(err);}
		
		res.json(posts);
	});
});

router.delete('/:post_id', function(req, res, next){
	Post.findByIdAndRemove(req.params.post_id, function(err, result){
		if(err){return next(err);}

		res.json({success:true, message:'Post has been deleted'});
	});
});


module.exports = router;