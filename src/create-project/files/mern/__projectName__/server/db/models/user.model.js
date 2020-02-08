const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: string
  },
  phone_number: {
    type: string
  },
  email: {
    type: string
  },
  age: {
    type: Number
  }
});
const userModel = new mongoose.model("user", userSchema);
module.exports = userModel;
