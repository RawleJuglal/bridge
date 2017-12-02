var mongoose = require('mongoose');

var ResumeSchema = mongoose.Schema({
    author:String,
    originalName:String,
    date:{
        type: Date,
        // `Date.now()` returns the current unix timestamp as a number
        default: Date.now
      },
    phone:String,
    email:String,
    file_path:String
}, {collection:'Resumes'});

mongoose.model('Resume', ResumeSchema);