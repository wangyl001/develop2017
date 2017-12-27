var express = require('express');
    router = express.Router();
    mongoose = require('mongoose');
    Post = mongoose.model('Post');

module.exports = (app) => {
  app.use('/posts', router);//路由的挂载点
};
//添加两个路由
router.get('/', (req, res, next) => {
  /*外键填充*/
  Post.find().populate('author').populate('category').exec((err, posts) => {
    //return res.jsonp(posts); //返回数据库的 用于调试返回 数据库的数据
    if (err) return next(err);
    //console.log(err+"!!!!");
    res.render('blog/index', {
      posts: posts,
      pretty:true,
    });
  });
});
//添加两个路由 about
router.get('/view', (req, res, next) => {

});
//添加两个路由 contact 路由
router.get('/comment', (req,  res, next) => {

});
//添加两个路由 contact 路由
router.get('/favourite', (req, res, next) => {

});
