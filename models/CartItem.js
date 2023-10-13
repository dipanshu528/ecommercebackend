const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartItemSchema = new Schema({
  user:{
              type: mongoose.Schema.Types.ObjectId,
              ref: 'user',
              required: true,
         },
  productId: {
    type: Number, // You can use ObjectId if you prefer
    required: true,
  },
  title:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  imageLink:{
    type: String,
    required: true
  },
  date:{
           type: Date,
            default : Date.now
         }
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;


