var mongoose = require("mongoose");

const productSchema = mongoose.Schema({
 name: {
    type: String,
    required: true,
  },
  type:String,
  image:String,
  quantity:String,
  price:String,
  description:String,
  rating:String

});



const Product = mongoose.model("Product",productSchema);
export default Product;
