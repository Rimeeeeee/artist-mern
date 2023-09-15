const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    title:String,
    owneraddress:String,
    photos:[String],
    description:String,
    perks:[String],
    catagory:String,
    
    stock:Number,
    
    price:Number,

});
const ProductModel=mongoose.model('Product',productSchema);
module.exports=ProductModel;