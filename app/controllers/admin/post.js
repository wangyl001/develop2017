var express = require('express');
router = express.Router();
mongoose = require('mongoose');
Post = mongoose.model('Post');
Category=mongoose.model('Category');
moment=require('moment');

module.exports = (app) => {
  app.use('/admin/posts', router);//路由的挂载点
};
//添加两个路由
//首页维持原样文章列表页面
router.get('/', (req, res, next) => {
  var sortby=req.query.sortby?req.query.sortby:'title';
  var sortdir=req.query.sortdir?req.query.sortdir:'desc';

  if(['title','category','author','created','published'].includes(sortby)==false){
     sortby='created';

  }
  if(['desc','asc'].includes(sortdir)==false){
    sortdir='desc';
  }
  var sortObj={};
  sortObj[sortby]=sortdir;
  /*外键填充*/
  Post.find({published:true})
    .sort(sortObj)
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
      res.render('admin/post/index', {
        posts: posts.slice((pageNum-1)*pageSize,pageNum*pageSize),
        pageNum:pageNum,
        pageCount:pageCount,
        sortdir:sortdir,
        sortby:sortby,
        pretty:true
      });
    });
  // next();
});
//post 增加
router.get('/add', (req, res, next) => {
  res.render('admin/post/add', {
    pretty:true
  });
});
router.post('/add', (req, res, next) => {

});

//更改页面
router.get('/edit/:id', (req, res, next) => {

});
//edit 提交页面
router.post('/edit/:id',(req,res,next) => {


})
//添加两个路由 contact 路由
router.get('/delete/:id', (req, res, next) => {
    if(!req.params.id){
      return next(new Error( ))
    }
    Post.remove({_id:req.params.id}).exec(function (err,rowsRemoved) {
      if(err){
        return next(err);
      }
      if(rowsRemoved){
        req.flash('success','文章删除成功');
      }else{
        req.flash('success','文章删除失败');
      }
      res.redirect('/admin/posts');
    })
});
