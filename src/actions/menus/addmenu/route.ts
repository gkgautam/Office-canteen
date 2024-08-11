"use server";

import connectDB from "@/db/connection";
import Menu from "@/models/menu.model";
import { sendMenuImageIntoCloud } from "@/utils/uploadImage";

// Your existing addMenu function
export async function addMenu(formData: FormData) {
  try {
    await connectDB(); // Ensure DB connection is established

    const menuItemName = formData.get("menuItemName");
    const menuItemCategory = formData.get("menuItemCategory");
    const menuItemDescription = formData.get("menuItemDescription");
    const menuItemPrice = formData.get("menuItemPrice");
    const menuItemImage = formData.get("menuItemImage") as File | null; // Type assertion

    if (!menuItemName || !menuItemPrice) {
      return {
        success: false,
        statusCode: 404,
        message: "Please provide all required details"
      };
    }

    const menuExist = await Menu.findOne({ menuItemName });

    if (menuExist) {
      return {
        success: false,
        statusCode: 400,
        message: "Menu Item Already Exists"
      };
    }

    let imageUrl: string | null = null;

    if (menuItemImage && menuItemImage instanceof File) {
      // Upload image
      const uploadImage = await sendMenuImageIntoCloud(menuItemImage);

      if (uploadImage) {
        imageUrl = uploadImage;
      } else {
        return {
          success: false,
          statusCode: 500,
          message: "Failed to upload image"
        };
      }
    }

    // Create and save new menu item
    const newMenu = new Menu({
      menuItemName,
      menuItemCategory,
      menuItemDescription,
      menuItemPrice,
      menuItemImage: imageUrl
    });

    const result = await newMenu.save();

    if (result) {
      return {
        success: true,
        statusCode: 200,
        message: "Menu Added Successfully"
      };
    } else {
      return {
        success: false,
        statusCode: 500,
        message: "Failed to add new menu item"
      };
    }

  } catch (error: any) {
    console.error("Error adding menu:", error);
    return {
      success: false,
      statusCode: 500,
      message: "Internal Server Error",
      error: error.message
    };
  }
}
