const express = require('express');
const glob = require('glob');

const favicon = require('serve-favicon');
const logger = require('morgan');
const moment=require('moment');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');

module.exports = (app, config) => {
  const env = process.env.NODE_ENV || 'development';
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';

  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');
  //Once set, the value of app.locals properties persist
  // throughout the life of the application,
  // in contrast with res.locals properties that are valid
  // only for the lifetime of the request.
  //wangyl add 添加一个中间键让水流往下流 主要是记住 全局的pageName 给全局添加一个
  app.use(function(req,res,next){
    app.locals.pageName=req.path;
    app.locals.moment=moment;
    //console.log(app.locals.pageName);
    next();//这里加next 意思是可以匹配接下来的路由
  })
  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  var controllers = glob.sync(config.root + '/app/controllers/**/*.js');
  controllers.forEach((controller) => {
    require(controller)(app);
  });

  app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

  return app;
};
