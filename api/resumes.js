var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Resume = mongoose.model('Resume');

if (!process.env.MONGODB_URI) {
  var mongoUri = 'mongodb://heroku_qcfnlfsn:shmrtnogm81jjotr8j5hs6srn8@ds125556.mlab.com:25556/heroku_qcfnlfsn'
} else {
  var mongoUri = process.env.MONGODB_URI
}

var storage = GridFsStorage({
	url:mongoUri,
	filename: function(req, file, cb){
		var datetimestamp = Date.now();
		return new Promise((resolve, reject) => {
			if(err){
				return reject(err);
			}
			var fileInfo = {
				bucketName: 'ctFiles',
				chunkSize:1024
			}
			resolve(fileInfo);
		})
		cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
	}
});


var upload = multer({ //multer settings for single upload
	storage: storage
}).single('file');

router.get('/', function(req, res, next){
	Resume.find(function(err, resumes){
		if(err){next(err);}

		res.json(resumes);
	});
});


router.post('/upload', function(req, res, next){
	console.log(req.body);
	console.log(req.file);
	upload(req, res, function(err){
		if(err){
			res.json({error_code:1, err_desc:err});
			return;
		}
		res.json(res);
	});
});

router.get('file/:filename', function(req, res, next){
	gfs.collection('ctFiles');

	gfs.files.find({filename: req.params.filename}).toArray(function(err, files){
		if(!files || files.length === 0){
			return res.status(404).json({
				responseCode:1, 
				responseMessage:"error"
			});
		}

		var readstream = gfs.createReadStream({
			filename: files[0].filename,
			root: "ctFiles"
		});

		res.set('Content-Type', files[0].contentType);
		return readstream.pipe(res);
	});
});

router.delete('/:filename', function(req, res, next){
	res.json({success:false, message:'Still need to set this route'});
})

module.exports = router;