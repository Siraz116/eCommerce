// const passport = require('passport');
const express = require('express');
const router =  express.Router();
const User=require('../models/user');

router.post("/signup", function(req, res){
    let memberSince=new Date();
    User.register({
                    username : req.body.email,
                    fullName: req.body.fullName, 
                    phone: req.body.phone,
                    address: req.body.address,
                    role:req.body.classes,
                    createdOn:memberSince
                  }, 
                    req.body.password, function(err, user){
      if (err) {
        console.log(err);
        res.render("login",{status:"failed"});
      } else {
        // passport.authenticate("local")(req, res, function(){
        //   res.redirect("/home");
        // });
        //res.redirect('/home');
        //res.send('success');
        res.render("login",{status:"success"});
        //console.log(req.user);
      }
    });
});

module.exports=router;