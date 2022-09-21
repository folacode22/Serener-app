const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {

products:{
  type:String,
  enum:["Drinks","Confectionary"]
},
itemName:{
  type:String,
  required:true,

},
availableProduct:{
  type:Number,
  required:true
},
 price: { type: Number,
required:true },


  },


  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
