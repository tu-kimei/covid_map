require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./config/db')

const app = express();

// mongodb configuration
const dbConnection = connectDB();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Require routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const locationsRoute = require('./routes/locations');
const helperRoute = require('./routes/helper');
const itemsRoute = require('./routes/items');
const item_listRoute = require('./routes/item_list');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/locations', locationsRoute);
app.use('/helper', helperRoute);
app.use('/items', itemsRoute);
app.use('/item_list', item_listRoute);

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
