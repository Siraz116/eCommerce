// const passport = require('passport');
const express = require('express');
const router =  express.Router();
const Order=require('../models/order');
const mongoose=require('mongoose');

router.get('/current-orders',function(req,res){
  let usr=req.user;
  let filter={$and: [
                    { $or: [{status: "pending"}, {staus:"confirmed"}] },
                    { customerName:req.user.fullName }]
             };

  Order.find(filter,function (err, docs) {
        if (err){
            console.log(err);
        }
        else{
        //  console.log("First function call : ", docs);
        res.render('receipt',{myself:usr,orders:docs});
        }
    });  
});
module.exports=router;