var mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  image: String,
});

const Category = mongoose.model("category", CategorySchema);
module.exports = Category;
