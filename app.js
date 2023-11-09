require('dotenv').config();
// const product =require('./api/product');
//const fs = require('fs');
//const readline = require('readline');
//const {readFileSync, promises: fsPromises} = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportLocal= require('passport-local');
const passportLocalMongoose= require('passport-local-mongoose');
const ejs= require('ejs');
const session= require('express-session');

const mongoose= require('mongoose');
const User=require('./models/user');

//const findOrCreate= require('mongoose-findorcreate');


// const homeRouter =require('./routes/home');
// const convertFile=require('./utilities/dataEntry');
const colors = require('colors');
//const {Parser}=require('json2csv');
const {spawn}=require('child_process');
const path = require('path');
const app =express();
// app.use("/api/product",product);
//const timeAgo=require(__dirname +"/public/timeAgo.js");
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine' , 'ejs');
app.use(express.static('public'));

let eCommerceDB="eCommerceDB";

mongoose.connect(process.env.eCommerceDB)
.then(()=>{
    console.log("Connected to database "+ eCommerceDB.rainbow)
})
.catch(err=>{
    console.log("Sorry, cannot connect!".red)
    console.log(err)
})

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const loginRouter = require('./routes/login');
app.use('/',loginRouter);
app.listen(process.env.PORT||3000,function(err){
  console.log('Alhamdulillah Server Started at 3000');
});