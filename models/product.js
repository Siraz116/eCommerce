const  mongoose  = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({
  productID: {type: Number, default:0},
  productName: String,
  availableQuantity: { type: Number, default: 100 } ,
  price: {type:Number, default: 99.99}
});
const Product = new mongoose.model("Product", productSchema);

module.exports= Product;