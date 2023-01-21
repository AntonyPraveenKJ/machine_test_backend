const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const productSchema=new Schema({
    productName:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subcategory:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('Products',productSchema)