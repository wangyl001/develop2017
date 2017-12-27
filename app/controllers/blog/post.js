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
  Post.find({published:true})
    .sort('created')
    .populate('author')
    .populate('category')
    .exec((err, posts) => {
    //return res.jsonp(posts); //返回数据库的 用于调试返回 数据库的数据
    if (err) return next(err);
    //console.log(err+"!!!!");
      //pageNum 变成正整数
      //通过req.query.page 方法将page 传值
      var pageNum=Math.abs(parseInt(req.query.page||1,10));
      var pageSize=10;
      var totalCount=posts.length;
      var pageCount=Math.ceil(totalCount/pageSize);
      if(pageNum>pageCount){
        pageNum=pageCount;
      }
      res.render('blog/index', {
          posts: posts.slice((pageNum-1)*pageSize,pageNum*pageSize),
          pageNum:pageNum,
          pageCount:pageCount,
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
