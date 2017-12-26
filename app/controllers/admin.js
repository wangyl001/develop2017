var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Article = mongoose.model('Article');

module.exports = (app) => {
  app.use('/admin', router);
};
//添加两个路由
router.get('/', (req, res, next) => {
  Article.find((err, articles) => {
    console.log('11');
    if (err) return next(err);
    console.log(err);
    res.render('admin/index', {
      title: 'Node Blog Admin',
      articles: articles
    });
  });
});
