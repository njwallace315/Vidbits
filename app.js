const path = require('path');
const express = require('express');
const expressHandlebars = require('express-handlebars');
const logger = require('morgan');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const engines = require('consolidate');

const app = express();

// View engine 
//when setting the engine below the option 'extname' is used to specify file extensions for express
//set 'layoutsDir' to tell handlebars where to look for the layouts. 
//the default is /views/layouts/ if you configure to a custom location (as we do in the next line) you must specify layoutsDir here
//https://github.com/ericf/express-handlebars#layoutsdirviewslayouts
app.engine('handlebars', expressHandlebars({defaultLayout: path.join(__dirname, 'views/layouts/app'), layoutsDir: path.join(__dirname, 'views')}));

//path.join() tajes in several strings and combines them into a platform valid 
//_dirName is the same as path.dirname(). It is the directory name of the current module
app.set('views', path.join(__dirname, 'views'));
//sets the default engine extenstion to "use when omitted". Sub Apps inherit this
//what does it mean "use when omitted"?
app.set('view engine', 'handlebars');

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

//bodyParser parses incoming request bodies in a midleware before your handlers
//urlencoded means that it only looks at content-type that matches the type option
//extended being false means you parse with querystring library
app.use(bodyParser.urlencoded({extended: false}));

//sets the default path to look for static files
//express uses a chain of checks. if it finds what it's looking for in static, it will use it.
//if it does not it will move on to the following app.use('/')
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error.handlebars');
});

module.exports = app;
