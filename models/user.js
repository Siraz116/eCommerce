const  mongoose  = require('mongoose');
const findOrCreate= require('mongoose-findorcreate');
const passport = require('passport');
const passportLocal= require('passport-local');
const passportLocalMongoose= require('passport-local-mongoose');

const d= new Date();
const userSchema = new mongoose.Schema ({
  username: String,
  fullName: String,
  email: String,
  phone: String,
  address: String,
  password: String,
  status:{type: String, default:"active"},
  role: {type: String, default:"user"},
  createdOn: {type: Date, default:d},
  card_number: {type: Number, default: 0},
  expiry_date: {type: String, default: "11/11"},
  cvv: {type: Number, default: 0},
  balance: {type: Number, default: 0}
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);
const User = new mongoose.model("User", userSchema);
passport.use(User.createStrategy());
passport.serializeUser(function(User, done) {
  done(null, User);
});

passport.deserializeUser(function(User, done) {
  done(null, User);
});

module.exports= User;