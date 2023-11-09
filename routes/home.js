// const passport = require('passport');
const express = require('express');
const router =  express.Router();
const User=require('../models/user');

router.get('/user',function(req,res){
    let usr=req.user;
    if(req.user.card_number!=0){
      res.render('home',{status:"",myself:usr});
    }
    else{
      res.redirect('/create-account');
    }
    
});

  module.exports=router;