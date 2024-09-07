import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

  orderDetails: [
    {
      _id: mongoose.Types.ObjectId,
      menuItemName: String,
      menuItemCategory: String,
      menuItemDescription: String,
      menuItemPrice: Number,
      menuItemImage: String,
      quantity: Number
    }
  ],

  paymentDetails: {
    order_by_email: {
      type: String,
      required: true
    },
    subTotal: {
      type: Number,
      required: true
    },
    shippingCharge: {
      type: Number,
      required: true
    },
    grandTotal: {
      type: Number,
      required: true
    },
  },
  orderStatus: {
    type: String,
    enum: ['confirmed', 'cancelled', 'preparing', 'pending', 'ready', 'completed'],
    defualt: 'confirmed'
  },
  pickup_slot_time: {
    type: String,
    required: true
  }
}, { timestamps: true });

mongoose.models = {};

// Create the model from the schema
const Order = mongoose.model("Order", orderSchema);

export default Order;
