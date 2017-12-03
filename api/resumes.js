var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var path = require('path');
var multer = require('multer');
// var GridFsStorage = require('multer-gridfs-storage');
var Resume = mongoose.model('Resume');
var fs = require('fs');

// if (!process.env.MONGODB_URI) {
//   var mongoUri = 'mongodb://heroku_qcfnlfsn:shmrtnogm81jjotr8j5hs6srn8@ds125556.mlab.com:25556/heroku_qcfnlfsn'
// } else {
//   var mongoUri = process.env.MONGODB_URI
// }

// var storage = GridFsStorage({
// 	url:mongoUri,
// 	filename: function(req, file, cb){
// 		var datetimestamp = Date.now();
// 		return new Promise((resolve, reject) => {
// 			if(err){
// 				return reject(err);
// 			}
// 			var fileInfo = {
// 				bucketName: 'ctFiles',
// 				chunkSize:1024
// 			}
// 			resolve(fileInfo);
// 		})
// 		cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
// 	}
// });


// var upload = multer({ //multer settings for single upload
// 	storage: storage
// }).single('file');

var resultHandler = function(err) { 
    if(err) {
       console.log("unlink failed", err);
    } else {
       console.log("file deleted");
    }
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    console.log(file.fieldname + '-' + Date.now()+'.'+file.mimetype.split('/')[1]);
    cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
  }
})

var upload = multer({ storage: storage }).single('file')


router.get('/', function(req, res, next){
	Resume.find(function(err, resumes){
		if(err){next(err);}

		res.json(resumes);
	});
});


router.post('/upload', function(req, res, next){
  var pathToUpload = '/app/uploads';
    
    fs.readdir(pathToUpload, function(err, item){
      if(err){
        fs.mkdir(pathToUpload, function(err, folder){
          if(err){return res.json({success:false, message:'failed to make folder', failedpath:pathToUpload})}
          
          upload(req, res, function (err) {
            if (err) {
              return res.json({success:false, message:err});
            }
            
              var resume = new Resume(req.body);
              resume.file_path = req.file.path;
              resume.originalName = req.file.originalname;
        
              resume.save(function(err){
                if(err){return next(err);}
                
                return res.json({success: true, message:'File Uploaded'});
              });
            // Everything went fine
          })
        })
      } else {
        upload(req, res, function (err) {
          if (err) {
            return res.json({success:false, message:err});
          }
          
            var resume = new Resume(req.body);
            resume.file_path = req.file.path;
            resume.originalName = req.file.originalname;
      
            resume.save(function(err){
              if(err){return next(err);}
              
              return res.json({success: true, message:'File Uploaded'});
            });
          // Everything went fine
        })
      }
    })
})

// router.get('file/:filename', function(req, res, next){
// 	gfs.collection('ctFiles');

// 	gfs.files.find({filename: req.params.filename}).toArray(function(err, files){
// 		if(!files || files.length === 0){
// 			return res.status(404).json({
// 				responseCode:1, 
// 				responseMessage:"error"
// 			});
// 		}

// 		var readstream = gfs.createReadStream({
// 			filename: files[0].filename,
// 			root: "ctFiles"
// 		});

// 		res.set('Content-Type', files[0].contentType);
// 		return readstream.pipe(res);
// 	});
// });

router.delete('/:resume_id', function(req, res, next){
  Resume.findById(req.params.resume_id, function(err, resume){
    if(err){return next(err)};
    fs.unlink(resume.file_path, resultHandler);
  });
  
  Resume.findByIdAndRemove(req.params.resume_id, function(err, result){
        if(err){console.log(err)}
        else{res.json(result)};
    });
});

module.exports = router;