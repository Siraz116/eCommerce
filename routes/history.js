// const passport = require('passport');
const express = require('express');
const router =  express.Router();
const Order=require('../models/order');
const mongoose=require('mongoose');
const User=require('../models/user');


router.get('/history',function(req,res){
    let usr=req.user;
    console.log(usr.role +" : "+usr.fullName);
    let name=usr.fullName;
    if(usr.role=="user"){
        Order.find({customerName:name}, function (err, docs) {
            if (err){
                console.log(err);
            }
            else{
              //  console.log("First function call : ", docs);
              res.render('history',{myself:usr,orders:docs});
            }
       // console.log(docs)
        });
    }
    else{
        Order.find({}, function (err, docs) {
            if (err){
                console.log(err);
            }
            else{
              //  console.log("First function call : ", docs);
              res.render('history',{myself:usr,orders:docs});
            }
        });
    }  
});

router.post('/received',function(req,res){
    let  id = mongoose.Types.ObjectId(req.body.orderID);
    console.log(id);
    let filter={_id:id,status:"on-the-way"};
    let update={status:"received"};
   // if(req.body.status=="supplied");{
      Order.findOneAndUpdate(filter, {$set:update}, {new: true}, (err, doc) => {
          if (err) {
            //  console.log(req.user.username +" fecing problem when updating data! ");
            //  console.log(" facing problem while updating the word "+doc.word);
          }

          //takeMoneyFromBuyer
          
          
          //return doc.save();
          console.log(doc)
          res.redirect('/history');
         //res.send(req.body);
        });
   // }
    
       
});

// router.post('/history',function(req,res){
//   let  id = mongoose.Types.ObjectId(req.body.orderID);

//   let filter={_id:id};
//   let update={status:"confirmed"};
//   Order.findOneAndUpdate(filter, {$set:update}, {new: true}, (err, doc) => {
//     if (err) {
//       //  console.log(req.user.username +" fecing problem when updating data! ");
//       //  console.log(" facing problem while updating the word "+doc.word);
//     }
//     //return doc.save();
//     console.log(doc)
//     res.redirect('/admin');
//    //res.send(req.body);
//   });
     
// });


  module.exports=router;