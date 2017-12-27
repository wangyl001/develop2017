var express = require('express');
    router = express.Router();
    mongoose = require('mongoose');
    Post = mongoose.model('Post');

module.exports = (app) => {
  app.use('/', router);
};
//添加两个路由
router.get('/', (req, res, next) => {
  /*外键填充*/
  Post.find().populate('author').populate('category').exec((err, posts) => {
    return res.jsonp(posts); //返回数据库的
    if (err) return next(err);
    res.render('blog/index', {
      title: 'Generator-Express MVC',
      post: posts,
      pretty:true,
    });
  });
});
//添加两个路由 about
router.get('/about', (req, res, next) => {
    res.render('blog/index', {
      title: 'About me',
      pretty:true,
    });
});
//添加两个路由 contact 路由
router.get('/contact', (req, res, next) => {
    res.render('blog/index', {
      title: 'Contact me',
      pretty:true,
    });

});
