var mongoose = require("mongoose");
var ObjectID = mongoose.Schema.Types.ObjectId;
const categoryItemSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  price: String,
  quantity: String,
  category: { type: ObjectID, ref: "Category" },
  description: String,
  discount: Number,
  status: String,
});

const CategoryItems = mongoose.model("CategoryItems", categoryItemSchema);
module.exports = CategoryItems;
