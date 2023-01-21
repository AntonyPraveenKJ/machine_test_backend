const express=require('express');
const { addcategory, getCategory, addSubCategory, getSub, addProduct, getProducts, getCatProCount, getCatProducts } = require('../Controllers/productControllers');
const router=express.Router()

router.post('/addNewCategory',addcategory);
router.get('/getCategory',getCategory);
router.put('/addmoresub',addSubCategory);
router.post('/getSub',getSub);
router.post('/addNewProduct',addProduct);
router.get('/getProducts',getProducts);
router.post('/getCount',getCatProCount);
router.post('/getCatProducts',getCatProducts);

module.exports=router;