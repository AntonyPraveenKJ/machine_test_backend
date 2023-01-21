const Category = require("../Models/category");
const Products = require("../Models/product");
const { ObjectId } = require("mongodb");
const objectId = require("mongodb").ObjectId;

//Adding new category

const addcategory = async (req, res, next) => {
  const { category, subcategory } = req.body;
  let categoryExist;

  try {
    categoryExist = await Category.findOne({ name: category });
  } catch (err) {
    return new Error(err);
  }

  if (categoryExist) {
    return res.status(400).json({ message: "Category already exist!!" });
  }

  const newCategory = new Category({ name: category });
  const newSubCategory = { name: subcategory };
  newCategory.subCategories.push(newSubCategory);
  newCategory.save();

  return res.status(201).json({ message: newCategory });
};

//Getting the list of categories

const getCategory = async (req, res, next) => {
  let anyData;
  try {
    anyData = await Category.find();
  } catch (err) {
    console.log(err);
  }

  if (anyData) {
    return res.status(200).json({ message: anyData });
  }

  return res.status(400).json({ message: "No data found!!" });
};

//Adding more subcategories

const addSubCategory = async (req, res, next) => {
  const { category, subcategory } = req.body;

  const newSubCategory = { name: subcategory };

  Category.findOneAndUpdate(
    { name: category },
    { $push: { subCategories: newSubCategory } },
    { new: true }
  )
    .then((updatedCategory) => {
      console.log("New subcategory added:", updatedCategory);
    })
    .catch((err) => {
      console.log(err);
    });
  return res.status(201).json({ message: "Subcategory added successfully" });
};

const getSub = async (req, res, next) => {
  const { category } = req.body;
  console.log(category, "=====");
  let sub = await Category.find(
    { name: category },
    { subCategories: 1, _id: 0 }
  );
  return res.status(201).json({ message: sub });
};

//adding products

const addProduct = async (req, res, next) => {
  const { proName, category, subcategory, price } = req.body;
  let anyProduct;

  try {
    anyProduct = await Products.findOne({ productName: proName });
  } catch (err) {
    console.log(err);
  }

  if (anyProduct) {
    return res.status(400).json({ message: "Product already exist" });
  }

  const newProduct = new Products({
    productName: proName,
    category: category,
    subcategory: subcategory,
    price: price,
  });

  try {
    await newProduct.save();
  } catch (err) {
    console.log(err);
  }

  await Category.updateOne(
    { name: category, "subCategories.name": subcategory },
    { $inc: { productCount: 1, "subCategories.$.productCount": 1 } }
  );

  return res.status(201).json({ message: newProduct });
};

//GET PRODUCTS

const getProducts = async (req, res, next) => {
  let products = await Products.find({});
  return res.status(201).json({ message: products });
};

//Get Product Count

const getCatProCount = async (req, res, next) => {
  const { catname } = req.body;
  let count = await Products.find({ category: catname }).count();
  return res.status(201).json({ message: count });
};

//get Products under category

const getCatProducts = async (req, res, next) => {
  const { category } = req.body;

  let getCategoryPro = await Products.find({ category: category });
  return res.status(201).json({ message: getCategoryPro });
};

exports.addcategory = addcategory;
exports.getCategory = getCategory;
exports.addSubCategory = addSubCategory;
exports.getSub = getSub;
exports.addProduct = addProduct;
exports.getProducts = getProducts;
exports.getCatProCount = getCatProCount;
exports.getCatProducts = getCatProducts;
