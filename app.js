var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var demoRouter = require('./app/routes/route_demo')

var hbs = require("hbs")

var config = require('./config')

var gmdf = require('gmdf').init_gmdf(config)

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('views', [path.join(__dirname, 'views'),path.join(__dirname,'node_modules/gmdf/views')]);
app.set('view engine', 'hbs');

hbs.registerHelper('out', function (v1, options) {
    return v1;
});
hbs.registerHelper('eq', function (v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});
hbs.registerHelper("gte", function (v1, v2, options) {
    if (v1 >= v2) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});
hbs.registerHelper("lte", function (v1, v2, options) {
    if (v1 <= v2) {
        //满足添加继续执行
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


app.use(config.project.base, express.static(path.join(__dirname, 'public'), {
    maxAge: '1d',
    index: false,
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now());
    }
}));

gmdf.init_session(app)
gmdf.apm(app)
app.use(gmdf.init_auth_check)




//初始化路由
gmdf.init_route({
    app:app,
    basePath:config.project.base
})



// app.use(config.project.base+'/', indexRouter);
app.use(config.project.base+'/demo', demoRouter);


//增加默认访问的处理
app.get( "/", function(req,res){

    res.redirect(config.project.base+'/');

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
