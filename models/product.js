var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  prImage: {
    type: String,
  },
  prName: String,
  prCategory: String,
  prPrice: String,
  prDetails: String,
  cloudinary_id: {
    type: String,
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
