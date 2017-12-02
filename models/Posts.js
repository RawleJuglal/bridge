var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title:String,
    date:Date,
    body:String,
    category:String,
    photo_link:String
}, {collection:'Posts'});

mongoose.model('Post', PostSchema);