var express = require('express');
router = express.Router();
mongoose = require('mongoose');
Post = mongoose.model('Post');
Category=mongoose.model('Category');
moment=require('moment');
module.exports = (app) => {
  app.use('/admin/categories', router);//路由的挂载点
};
//添加两个路由
router.get('/', (req, res, next) => {
      res.render('admin/category/index', {
        pretty:true
      });
});
router.get('/add', (req, res, next) => {
      res.render('admin/category/add', {
        pretty:true
      });

});
router.post('/add', (req, res, next) => {

});
router.get('/edit/:id', (req, res, next) => {

});
//添加两个路由 about
router.post('/edit/:id', (req, res, next) => {

});
//添加两个路由 contact 路由

router.get('/delete/:id',(req,res,next) => {


})

