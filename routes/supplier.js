// const passport = require('passport');
const express = require('express');
const router =  express.Router();
const Order=require('../models/order');
const mongoose =require('mongoose');
const User=require('../models/user');

function takeMoneyFromAdmin(amount){
  User.findOne({role:"admin"}).
  exec(function(err,result){
      result.balance-=Number(amount);
      result.save();
      return;
  });
}

function giveMoneytoBuyer(user,amount){
  User.findOne({fullName:user}).
  exec(function(err,result){
      result.balance+=amount;
      result.save();
      return;
  });
}

function giveMoneytoSupplier(amount){
  User.findOne({role:"supplier"}).
  exec(function(err,result){
      result.balance+=Number(amount);
      result.save();
  });
}

router.get('/supplier',function(req,res){
  let usr=req.user;
  Order.find({status:"pending"}, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
      //  console.log("First function call : ", docs);
      res.render('receipt',{myself:usr,orders:docs});
    }
});
    
});

router.post('/Supply',function(req,res){
  let  id = mongoose.Types.ObjectId(req.body.orderID);

  let filter={_id:id};
  let update={status:req.body.submit_btn};
  Order.findOneAndUpdate(filter, {$set:update}, {new: true}, (err, doc) => {
    if (err) {
      //  console.log(req.user.username +" fecing problem when updating data! ");
      //  console.log(" facing problem while updating the word "+doc.word);
    }
    //return doc.save();
    if(doc){
      if(req.body.submit_btn=="confirmed")
      {
        req.user.balance+=doc.totalCost;
        takeMoneyFromAdmin(doc.totalCost);
        giveMoneytoSupplier(doc.totalCost);
      }
      else{
        takeMoneyFromAdmin(doc.totalCost);
        giveMoneytoBuyer(doc.customerName,doc.totalCost);
      }
      
    }
    console.log(doc)
    res.redirect('/history');
   //res.send(req.body);
  });
     
});

  module.exports=router;