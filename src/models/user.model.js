import mongoose from "mongoose";

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
    min: 0,
  },
  company_id: {
    type: String,
    required: false,
  },
  avatar: {
    type: String,
    required: false,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order"
    }
  ]
}, { timestamps: true });

mongoose.models = {};

// Create the model from the schema
const User = mongoose.model("User", userSchema);

export default User;
