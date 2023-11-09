const  mongoose  = require('mongoose');
const product=require('../models/product');
const User = require('../models/user');
const schema = mongoose.Schema;
const i=0;
const d=new Date();

let min=100000000001
let max=999999999999
let tid=Math.floor(Math.random() * (max - min) + min);

const orderSchema = new schema({
 // orderNo: {type:Number , default:findTotal()},
  products: [{
    productName: String,
    quantity: Number,
    price: Number
  }],
  customerName: String,
  customerPhone: String,
  customerAddress: String,
  totalCost: Number,
  status: {type: String, default:"pending"},
  time: {type: Date, default:d},
  transactionId: {type:Number, default:tid}
});


async function findTotal(){
  const cnt=Order.count({}, function( err, count){
    console.log( "Number of Orders:", count );
  });
  return cnt+1;
}

const Order = new mongoose.model("Order", orderSchema);

module.exports= Order;