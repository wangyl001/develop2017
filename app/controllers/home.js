var express = require('express');
    router = express.Router();
    mongoose = require('mongoose');
    Article = mongoose.model('Article');

module.exports = (app) => {
  app.use('/', router);
};
//添加两个路由
router.get('/', (req, res, next) => {
  Article.find((err, articles) => {
    if (err) return next(err);
    res.render('blog/index', {
      title: 'Generator-Express MVC',
      articles: articles,
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
