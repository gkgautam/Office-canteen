import mongoose from "mongoose";

// Define the schema for the Menu model
const menuSchema = new mongoose.Schema({
  menuItemName: {
    type: String,
    required: true,
  },
  menuItemCategory: {
    type: String,
    enum: ['appetizer', 'main_course', 'dessert', 'beverage'],
    required: true,
  },
  menuItemDescription: {
    type: String,
    required: true,
  },
  menuItemPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  menuItemImage: {
    type: String, // Store the file URL or path as a string
    required: false,
  },
}, { timestamps: true }); // Add createdAt and updatedAt timestamps

mongoose.models = {};

// Create the model from the schema
const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
