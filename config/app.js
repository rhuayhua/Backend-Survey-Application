let createError = require('http-errors');
let express = require('express');
///let path = require('path');
///let cookieParser = require('cookie-parser');
let logger = require('morgan');
///let session = require('express-session');
///let flash = require('connect-flash');
let passport = require('passport');
let errorHandler = require('./error-handler');///
let compression = require('compression');///
let  cors = require('cors');///



// Get route modules
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let surveyRouter = require('../routes/survey');
let questionRouter = require('../routes/question');
let answerRouter = require('../routes/answer');

let app = express();

app.use(compression());///

app.use(cors());///


// app.use(session({
//   saveUninitialized: true,
//   resave: true,
//   secret: "sessionSecret"
// }));



// view engine setup
///app.set('views', path.join(__dirname, '../views'));
///app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
///app.use(cookieParser());
///app.use(express.static(path.join(__dirname, '../public')));
///app.use(express.static(path.join(__dirname, '../node_modules')));



// Sets up passport
///app.use(flash());
app.use(passport.initialize());
///app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/survey', surveyRouter);
app.use('/question', questionRouter);
app.use('/answer', answerRouter);

/**
 * Any error handler middleware must be added AFTER you define your routes.
 */
 app.use(errorHandler);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  ///next(createError(404));
  res.status(404).json(
    { 
      statusCode: 404, 
      message: "The endpoint does not exist."
    }
  );
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
