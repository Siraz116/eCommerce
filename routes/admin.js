// const passport = require('passport');
const express = require('express');
const router =  express.Router();
const Order=require('../models/order');
const mongoose=require('mongoose');

// router.get('/admin',function(req,res){
//   res.redirect('/history');
// });
router.get('/admin',function(req,res){
  let usr=req.user;
  Order.find({status:"confirmed"}, function (err, docs) {
    if (err){
        console.log(err);
    }
    else{
      //  console.log("First function call : ", docs);
      res.render('admin',{myself:usr,orders:docs});
    }
});  
});

router.post('/Confirm',function(req,res){
  let  id = mongoose.Types.ObjectId(req.body.orderID);

  let filter={_id:id,status:"confirmed"};
  let update={status:"on-the-way"};
  Order.findOneAndUpdate(filter, {$set:update}, {new: true}, (err, doc) => {
    if (err) {
      //  console.log(req.user.username +" fecing problem when updating data! ");
      //  console.log(" facing problem while updating the word "+doc.word);
    }
    //return doc.save();
    console.log(doc)
    res.redirect('/history');
   //res.send(req.body);
  });
     
});


  module.exports=router;