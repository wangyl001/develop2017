var express = require('express');
    router = express.Router();
    mongoose = require('mongoose');
    Post = mongoose.model('Post');
    Category=mongoose.model('Category');
    moment=require('moment');
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
          pretty:true
        });
  });
});
router.get('/category/:name', (req, res, next) => {
   //res.jsonp(req.params);

  Category.findOne({name:req.params.name}).exec(function(err,category){
     if(err){
       return next(err);
     }
     Post.find({category:category,published:true})
         .sort('created')
         .populate('category')
         .populate('author')
        .exec(function (err,posts) {
         if(err){
           return next(err);
         }
         console.log(category.name);
         res.render('blog/category', {
           category:category,
           posts: posts,
           pretty:true,
         });
       })
      })
});
//添加两个路由 about
router.get('/view/:id', (req, res, next) => {
  if(!req.params.id){
     return next(new Error('no post id provided'));
  }
  var conditions = {};
  try {
    conditions._id = mongoose.Types.ObjectId(req.params.id);
  } catch (err) {
    conditions.slug = req.params.id;
  }

  Post.findOne(conditions)
    .populate('category')
    .populate('author')
    .exec(function (err, post) {
      if (err) {
        return next(err);
      }

      res.render('blog/view', {
        post: post
      });
    });
});
//添加两个路由 contact 路由

router.post('/comment/:id',(req,res,next) => {
    //res.jsonp(req.body);//测试下看看看数据有没有过来
   //用户发过来的数据进行校验
    if (!req.params.id) {
      return next(new Error('no email provided for commenter'));
    }
    if (!req.body.email){
      return next(new Error('no email provided for commenter'));
    }
    var conditions = {};
    try {
      conditions._id = mongoose.Types.ObjectId(req.params.id);
    } catch (err) {
      conditions.slug = req.params.id;
    }
    console.log(req.params.id);
    Post.findOne(conditions).exec(function (err,post) {
      if(err){
        return next(err);
      }
      var comment={
                   email:req.body.email,
                   content:req.body.content,
                   created:moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                 };
      /*comments是一个数组 unshift直接是在上面*/
      post.comments.unshift(comment);
      post.markModified('comment');
      post.save(function(err,post){
        /*直接跳转到文章的详情页面*/
        req.flash('info','评论添加成功！！！');
        res.redirect('/posts/view/'+post.slug);
      })
    });

})
//添加两个路由 contact 路由
router.get('/favorite/:id', (req, res, next) => {
  if (!req.params.id) {
    return next(new Error('no post id provided'));
  }

  var conditions = {};
  try {
    conditions._id = mongoose.Types.ObjectId(req.params.id);
  } catch (err) {
    conditions.slug = req.params.id;
  }
  /*外键填充这样的作用其实是仿制关系数据库中的外键*/
  Post.findOne(conditions)
    .populate('category')
    .populate('author')
    .exec(function (err, post) {
      if (err) {
        return next(err);
      }

      post.meta.favorites = post.meta.favorites ? post.meta.favorites + 1 : 1;
      //混合类型因为没有特定约束，因此可以任意修改，一旦修改了原型，则必须调用markModified()
      post.markModified('meta');
      post.save(function (err) {
        req.flash('info','点赞成功！！！');
        res.redirect('/posts/view/' + post.slug);
      });
    });
});
