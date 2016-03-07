var mongoose = require('mongoose'),
    schema = mongoose.Schema;

// Connect to the mongodb
mongoose.connect('mongodb://localhost/MEAN-BLOG');

// Create article schema
var postSchema = new schema({
    title: String,
    content: String,
    comments: [{comment: String}],
    date: {type: Date, default: Date.now()}
});

// Create article model
var post = mongoose.model('post', postSchema);

module.exports = function (app) {
    // Display all article and sort by date.
    app.get('/posts', function (req, res) {
      post.find({}).sort({date: -1}).exec(function (err, docs) {
        res.json(docs);
      });
    });

    // Receive and save article into mongodb
    app.post('/post/add', function (req, res) {
      req.body.date = Date.now();
      var article = new post(req.body);

      article.save(function (err, docs) {
        res.json({status: 'done'});
      });
    });

    // Display an article according to _id
    app.get('/post/:_id', function (req, res) {
      var _id = req.params._id,
          comment = req.body;

      post.findOne({_id: _id}).exec(function (err, docs) {
        res.json(docs);
      });
    });

    // Save comments with article
    app.post('/post/:_id/comment', function (req, res) {
      var _id = req.params._id,
          comment = req.body;

      post.update({_id: _id}, {$push: {comments: comment}}).exec(function (err, docs) {
        res.json({status: 'done'});
      });
    });

    // otherwise redirect to index.html
    app.get('*', function (req, res) {
      res.sendfile('app/index.html');
    });
}
