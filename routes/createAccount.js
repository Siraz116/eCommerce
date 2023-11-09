// const passport = require('passport');
const express = require('express');
const router =  express.Router();
const User=require('../models/user');
const Order =require('../models/order');
const { name } = require('ejs');
async function create_account(usr,card_number,expiry_date,cvv) {
    try{
      await User.findOne({username: usr})
                .exec(function(err,user){

                    user.card_number=card_number;
                    user.expiry_date=expiry_date;
                    user.cvv=cvv;
                    user.balance=5000;
                    //    if(user.status=="active")
                    //       {
                    //         user.status='inactive';
                    //       }
                    //     else{
                    //       user.status='active';
                    //     }
  
                    user.save();
                });
      return;
    }
    catch(error){
  
    }
  }

router.get("/create-account",function(req,res){
    res.render('addCard.ejs',{myself:req.user});
});
router.post("/create-account", function(req, res){
   
    let ha=req.body.have_account;
    let ed = req.body.expiryDate;
    let cvv = req.body.cvv;
    let cn=req.body.cardNumber;
   // let ch=req.body.card_holder;
    if(ha==0){
        //save bank information
        create_account(req.user.username, cn, ed, cvv)
    }
    res.render("home",{status:"success",myself:req.user});
});
module.exports=router;