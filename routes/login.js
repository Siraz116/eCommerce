const passport = require('passport');
const express = require('express');
const router =  express.Router();
const User=require('../models/user');
const homeRouter =require('./home');
const signupRouter =require('./signup');
const adminRouter =require('./admin');
const supplierRouter =require('./supplier');
const cartRouter = require('./cart');
//const cardRouter = require('./card');
const paymentRouter= require('./payment');
const historyRouter=require('./history');
const ordersRouter=require('./myOrders');
const createAccountRouter=require('./createAccount');

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
function isAuthenticUser(req, res, next) {
  if (req.isAuthenticated() && req.user.role=="user") {
    return next();
  }
  res.redirect('/');
}
function isAuthenticSupplier(req, res, next) {
  if (req.isAuthenticated() && req.user.role=="supplier") {
    return next();
  }
  res.redirect('/');
}
function isAuthenticAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role=="admin") {
    return next();
  }
  res.redirect('/');
}

router.get('/',function(req,res){
  res.render('login',{status:"nothing"});
});

router.post('/login', function(req, res){
  const user = new User({
    username: req.body.email,
    password: req.body.password
    //,role    : req.body.classes
  });

  req.login(user, function(err){
    if (err) {
      return next(err);
      //res.render('login');
    } else {
      
      passport.authenticate('local')(req, res, function(){ 
            // console.log(req.user);  
             if(req.user.role==req.body.classes){
              res.redirect('/'+req.user.role);
             }
             else{
              res.render("login",{status:"failed"})
             }
            });
    }
  });
});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

router.post('/signup',signupRouter);
router.get('/user',isAuthenticUser,homeRouter);
router.get('/admin',isAuthenticAdmin,adminRouter);
router.get('/supplier',isAuthenticSupplier,supplierRouter);
router.post('/cart', isAuthenticUser,cartRouter);
router.post('/card', isAuthenticUser,paymentRouter);
router.post('/payment',isAuthenticUser,paymentRouter);
router.post('/Confirm',isAuthenticAdmin,adminRouter);
router.post('/Supply',isAuthenticSupplier,supplierRouter);
router.get('/history',isLoggedIn,historyRouter);
router.post('/received',isAuthenticUser,historyRouter);
router.get('/current-orders',isAuthenticUser,ordersRouter);
router.get('/create-account',createAccountRouter);
router.post('/create-account',createAccountRouter);
module.exports=router;