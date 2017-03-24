
// require our dependencies
var express        = require('express');
var session		     = require('express-session');
var expressLayouts = require('express-ejs-layouts');
var bodyParser     = require('body-parser');
var app            = express();
var port           = process.env.PORT || 8080;

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

// use ejs and express layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);

// use body parser
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// route our app
var router = require('./app/routes');
app.use('/', router);


// set static files (css and images, etc) location
app.use(express.static(__dirname + '/public'));

// start the server
app.listen(port, function() {
  console.log('app started');
});
