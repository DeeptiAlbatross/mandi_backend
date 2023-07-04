var mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  image: String,
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
