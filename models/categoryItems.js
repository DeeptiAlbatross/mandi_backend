var mongoose = require("mongoose");

const categoryItemSchema = mongoose.Schema({
 categoryItemName: {
    type: String,
    required: true,
  },
  type:String,
  image:String,
  price:String,
  quantity:String,
  category:String,
  description:String,
  discount:Number,
  status:String

});



const item = mongoose.model("item",categoryItemSchema);
export default item;