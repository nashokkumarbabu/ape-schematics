const mongoose = require("mongoose");

export const productSchema = new mongoose.Schema({
  product_name: {
    type: String
  },
  product_title: {
    type: string
  },
  product_number: {
    type: string
  },
  product_price: {
    type: string
  }
});
const productModel = new mongoose.model("user", productSchema);
module.exports = productModel;
