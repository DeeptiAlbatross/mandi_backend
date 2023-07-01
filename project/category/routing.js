var express = require("express");
const CategoryModel = require("../../models/category");
var router = express.Router();

router.post("/category/admin/add", function (req, res, next) {
  console.log("656565656565656565 is connected...");
  const { categoryName, image } = req.body;

  const NewCategory = new CategoryModel({
    categoryName,
    image,
  });

  NewCategory
    .save()
    .then((savedCategory) => {
      console.log("Category created:", savedCategory);
      res.send(savedCategory);
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
