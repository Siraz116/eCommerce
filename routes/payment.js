// const passport = require('passport');
const express = require('express');
const router =  express.Router();
const User=require('../models/user');
const Order =require('../models/order');
const { name } = require('ejs');
let order;
function takeMoneyFromBuyer(user,amount){
    User.findOne({username:user}).
    exec(function(err,result){
        result.balance-=amount;
        result.save();
        return;
    });
}

function giveMoneytoAdmin(amount){
    User.findOne({role:"admin"}).
    exec(function(err,result){
        result.balance+=amount;
        result.save();
        return;
    });
}
function countItems(data){
    let items=0;
    if(typeof data.productName=="string"){
        items=1;
    }
    else if(data.productName[2]){
        items=3;
    }
    else{
        items=2;
    }
    return items;
}
router.post("/card", function(req, res){
    let total=req.body.total;
    if(total!=0){


        let list=[];
        let items=countItems(req.body);
        if(items==1){
            let product={
                productName:req.body.productName,
                quantity:req.body.quantity,
                price: req.body.price
            }
            list.push(product);
        }
        else{
            for(let i=0; i<items; i++){
                let product={
                    productName:req.body.productName[i],
                    quantity:req.body.quantity[i],
                    price: req.body.price[i]
                }
                list.push(product);
            }
        }
        order = new Order({
            products:list,
            customerName:req.user.fullName,
            customerPhone:req.user.phone,
            customerAddress:req.user.address,
            totalCost:total
        });
       // order.save();
            console.log(order);

        res.render('payment',{myself:req.user,total:total,status:"nothing",message:"nothing"});
        //res.send(req.body);
      // res.send("<h1>"+items+"</h1>");
    }
    else{
        res.render('home',{status:"failed",myself:req.user});
    }
});

router.post("/payment", function(req, res){
    let total=req.body.total;
    //console.log(req.user);
    console.log(req.user.expire_date +" : "+req.body.expiryDate);
    console.log(req.user.fullName +" : "+req.body.cardHolder );
    console.log(req.user.card_number +" : "+req.body.cardNumber); 
    console.log(req.user.cvv +" : "+req.body.cvv );

    if(req.user.expiry_date !=req.body.expiryDate 
        ||req.user.fullName !=req.body.cardHolder 
        || req.user.card_number !=req.body.cardNumber 
        || req.user.cvv !=req.body.cvv ){

            //res.render('home',{status:"failed",myself:req.user});
            res.render('payment',{myself:req.user,total:total,status:"failed",message:"The information doesn't match!"});
            

    }
    else if(req.user.balance < total){
        res.render('payment',{myself:req.user,total:total,status:"failed",message:"Insufficent Balance!"});
            
    }
    else{
        req.user.balance-=Number(total);
        takeMoneyFromBuyer(req.user.username, Number(total))
        order.save();
        giveMoneytoAdmin(Number(total));
        res.render('success',{total:total,myself:req.user});
    }
});
module.exports=router;