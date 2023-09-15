const mongoose=require('mongoose');
const orderSchema=new mongoose.Schema({
  product:{type:mongoose.Schema.Types.ObjectId,required:true,ref:'Product'},
  user:{type:mongoose.Schema.Types.ObjectId,required:true},
  items:{type:Number,required:true},
  sender:{type:String,required:true},
  reciever:{type:String,required:true},
  price:Number
});
const OrderModel=mongoose.model('Order',orderSchema);
module.exports=OrderModel;