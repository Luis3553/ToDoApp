var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { expressjwt: jwt } = require("express-jwt");

var accountsRouter = require('./routes/accounts');
var tasksRouter = require('./routes/tasks');
var profileRouter = require('./routes/profileImg');
var userRouter = require('./routes/user');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(jwt({
  secret: 'secret',
  algorithms: ["HS256"],
}).unless({ path: ["/api/login", '/api/register'] }));

//Routers
app.use('/api', accountsRouter);
app.use('/api/dashboard', userRouter); // gets user info <--
app.use('/api/dashboard/tasks', tasksRouter);
app.use('/api/dashboard/profile-photo', profileRouter); //pfp <- Profile Photo

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.send('error');
});

module.exports = app;
