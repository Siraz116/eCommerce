// const passport = require('passport');
const express = require('express');
const router =  express.Router();
const User=require('../models/user');

router.post('/cart', function(req, res){
    let no_keybord;
    let no_mouse;
    let no_pendrive;
    //product_1
    if(req.body.no_keybord){
        no_keybord=req.body.no_keybord;
    }
    else{
        no_keybord=0;
    }
    //product_2
    if(req.body.no_mouse){
        no_mouse=req.body.no_mouse;
    }
    else{
        no_mouse=0;
    }
    //product_3
    if(req.body.no_pendrive){
        no_pendrive=req.body.no_pendrive;
    }
    else{
        no_pendrive=0;
    }

    res.render('view',{myself:req.user, keybord:no_keybord, pendrive:no_pendrive, mouse:no_mouse });
});

module.exports=router;