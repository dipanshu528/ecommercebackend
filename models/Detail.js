const mongoose = require("mongoose");
const { Schema } = mongoose;

const DetailSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  phone: {
    type: Number
  },
  altphone: {
    type: Number
   
  },
  address: {
    type: String
  },
  altaddress: {
    type: String,
   
  },
});

const Detail = mongoose.model("userdetail", DetailSchema);
module.exports = Detail;
