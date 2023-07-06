const { json } = require("body-parser");
const { response } = require("express");
var express = require("express");
const CategoryModel = require("../../models/category");
const { db, aggregate } = require("../../models/categoryItems");
const CategoryItemModel = require("../../models/categoryItems");
var router = express.Router();

// Api to post the data.
router.post("/category/admin/add", function (req, res, next) {
  const { categoryName, image } = req.body;

  const NewCategory = new CategoryModel({
    categoryName,
    image,
  });

  NewCategory.save()
    .then((savedCategory) => {
      console.log("Category created:", savedCategory);
      res.send(savedCategory);
    })
    .catch((error) => {
      res.send(error);
    });
});

// Api to get the data to dispaly.
router.get("/category/get", function (req, res) {
  CategoryModel.find()
    .then((result) => {
      console.log("result", result);
      res.send(result);
    })
    .catch((error) => {
      console.log("error", error);
      res.send(error);
    });
});

//  Api to update the items.
router.post("/category/admin/:id/edit", function (req, res, next) {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;
    console.log("ID", id, categoryName);
    CategoryModel.findOneAndUpdate(
      { _id: id },
      {
        categoryName,
      }
    ).then((updatedCategory) => {
      console.log("updatedCategory", updatedCategory);
      res.send(updatedCategory);
    });
  } catch (err) {
    console.log("RRRRRR", err);
    res.send(err);
  }
});

// Api to delete items
router.delete("", function (req, res, next) {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;
    console.log("ID", id, categoryName);
    CategoryModel.findOneAndRemove(
      { _id: id },
      {
        categoryName,
      }
    ).then((deletedCategory) => {
      console.log("deletedCategory", deletedCategory);
      res.send(deletedCategory);
    });
  } catch (err) {
    console.log("enheruycgrrmrckle", err);
    res.send(err);
  }
});

// api to save the item details.
router.post("/category/item/add", function (req, res, next) {
  const { name, image, price, quantity, category } = req.body;

  const AddCategoryItem = new CategoryItemModel({
    name,
    image,
    price,
    quantity,
    category,
  });

  AddCategoryItem.save()
    .then((savedCategory) => {
      console.log("Category created:", savedCategory);
      res.send(savedCategory);
    })
    .catch((error) => {
      res.send(error);
    });
});

// api to fetch the saved data/items.
router.get("/category/admin/item/list", function (req, res) {
  CategoryItemModel.find()
    .then((result) => {
      console.log("result", result);
      res.send(result);
    })
    .catch((error) => {
      console.log("error", error);
      res.send(error);
    });
});
`
`
// api to find the category of the item.
router.get("/category/details/admin/item/list", async function (req, res) {
  try {
    let items = await CategoryItemModel.find().populate("category");
    res.send({ success: true, data: items });
  } catch (err) {
    res.send({ success: false, error: err });
    console.log("data items nhi h");
  }
});


// Api to add category .
router.get("/category/admin/categoryName/add",function (req, res, next) {
  const { categoryName, image } = req.body;

  const AddCategory = new CategoryModel({
    categoryName,
    image
  });
  AddCategory.save()
    .then((savedCategory) => {
      console.log("Category added:", savedCategory);
      res.send(savedCategorys);
    })
    .catch((error) => {
      res.send(error);
    });
});



//  Api category item ki detail de.
// like jese mango fruits category h to uski details do .
router.get("/category/user/items/:id/detail", function (req, res, next) {
  const {id} = req.params

  CategoryItemModel.findOne({_id:id}).populate("category")
    .then((result) => {
      console.log("result", result);
      res.send(result);
    })
    .catch((error) => {
      console.log("error", error);
      res.send(error);
    });
});

module.exports = router;
