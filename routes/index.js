if(process.env.NODE_ENV !=='production'){
  require('dotenv').config
}

require('dotenv').config
var express = require('express');
var router = express.Router();
const users = [];
const bcrypt = require('bcrypt');
const passport = require('passport');
let config = require('config');
const app = require('../config/app');
const flash = require('express-flash')
const session = require('express-session')
const compress = require
router.use(express.urlencoded({extende:false}))
router.use(session({
  secret: 'test', 
  resave:false,
  saveUninitialized: false
}))
router.use(passport.initialize())
router.use(passport.session())

router.use(flash())
const initializepassport = require('./passport-config');


initializepassport(passport, username=>{
 return users.find(user => user.username === username), 
 id => users.find(user => user.id === id) 
})

router.get('/', function (req, res) {
  res.render('Home', { title: 'Home' });
});
/* GET home page. */
router.get('/home', function (req, res) {
  res.render('Home', { title: 'Home' });
});
/* GET About page. */
router.get('/about', function(req, res, next) {
  res.render('About_me', { title: 'About' });
});
/* GET Services page. */
router.get('/services', function(req, res, next) {
  res.render('Services', { title: 'Services' });
});
/* GET Products page. */
router.get('/projects', function(req, res, next) {
  res.render('Projects', { title: 'Projects' });
});
/* GET Contact page. */
router.get('/contact', function(req, res) {
  res.render('Contact', { title: 'Contact' });
});
router.get('/login', function(req, res) {
  res.render('Login', { title: 'Login Page' });
});
router.post('/login', passport.authenticate('local',{
  successRedirect: '/buscontacts', 
  failureFlash:true
} ))
router.get('/register', function(req, res) {
  res.render('register', { title: 'Login Page' });
});
router.post('/register', async (req, res) =>{
  try{
    const hashedpass = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      user: req.body.username,
      password: req.body.password


    })
    res.redirect('/login')

  }catch{
    res.redirect('/register')

  }
  
})
module.exports = router;
