var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');
var cookieSession = require('cookie-session')
// Configure the local strategy for use by Passport.
//
// The local strategy requires a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.
passport.use(new Strategy(
function(username, password, cb) {
db.users.findByUsername(username, function(err, user) {
if (err) { return cb(err); }
if (!user) { return cb(null, false); }
if (user.password != password) { return cb(null, false); }
return cb(null, user);
});
}));

// Configure Passport authenticated session persistence.
// Serialize and deserialize users
passport.serializeUser(function(user, cb) {
cb(null, user.id);
});
passport.deserializeUser(function(id, cb) {
db.users.findById(id, function (err, user) {
if (err) { return cb(err); }
cb(null, user);
});
});
app.get('/',
function(req, res) {
res.render('index', {
user: req.user });
});
app.get('/home',
function(req, res) {
res.render('home', { user: req.user });
});
app.get('/login',
function(req, res){
res.render('login');
});
app.post('/login',
passport.authenticate('local', { failureRedirect:
'/login' }),
function(req, res) {
res.redirect('/');
});
app.get('/logout',
function(req, res){
req.logout();
res.redirect('/');
});
// Create a new Express application.
var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

// COOKIE AND SESSION::
 
app.set('trust proxy', 1) // trust first proxy
 
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))
 
app.use(function (req, res, next) {
  // Update views
  req.session.views = (req.session.views || 0) + 1
 
  // Write response
  res.end(req.session.views + ' views')
})
// Define routes.
app.listen(3000);
