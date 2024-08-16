"use server";

import connectDB from "@/db/connection";
import Menu from "@/models/menu.model";
import { deleteImagefromCloud, sendMenuImageIntoCloud } from "@/utils/uploadImage";

interface CanteenAddMenuFormProps {
  menuItemName: string;
  menuItemCategory: string;
  menuItemDescription: string;
  menuItemPrice: number;
  menuItemImage: File | null; // Changed type to File | null
}
// Your existing addMenu function
export async function updateCurrentMenuItem(id: string, formData: FormData) {
  try {
    await connectDB(); // Ensure DB connection is established


    const menuItemName = formData.get("menuItemName");
    const menuItemCategory = formData.get("menuItemCategory");
    const menuItemDescription = formData.get("menuItemDescription");
    const menuItemPrice = formData.get("menuItemPrice");
    const menuItemImage = formData.get("menuItemImage") as File | null | string; // Type assertion    

    const currentMenuItem: any = await Menu.findById({ _id: id });

    if (menuItemImage !== currentMenuItem.menuItemImage) {

      if (typeof menuItemImage === "string") {
        // Find the last '/' and the position of '.jpg'
        const lastSlashIndex = menuItemImage.lastIndexOf('/');
        const dotIndex = menuItemImage.lastIndexOf('.');

        // Extract the substring between the last '/' and '.jpg'
        const public_id: string = menuItemImage.substring(lastSlashIndex + 1, dotIndex);
        await deleteImagefromCloud(public_id);
      }
      else if (typeof menuItemImage === "object") {
        if (menuItemImage !== null) {
          const newMenuItemImageUrl = await sendMenuImageIntoCloud(menuItemImage);

          currentMenuItem.menuItemName = menuItemName || currentMenuItem.menuItemName;
          currentMenuItem.menuItemCategory = menuItemCategory || currentMenuItem.menuItemCategory;
          currentMenuItem.menuItemDescription = menuItemDescription || currentMenuItem.menuItemDescription;
          currentMenuItem.menuItemPrice = menuItemPrice || currentMenuItem.menuItemPrice;
          currentMenuItem.menuItemImage = newMenuItemImageUrl || currentMenuItem.menuItemImage;

          const updatedMenuItem = await currentMenuItem.save();

          if (updatedMenuItem) {
            return {
              success: true,
              statusCode: 200,
              message: "Menu updated Successfully"
            };
          } else {
            return {
              success: false,
              statusCode: 500,
              message: "Failed to fetch data"
            };
          }
        }
      }
    }
    else {
      currentMenuItem.menuItemName = menuItemName || currentMenuItem.menuItemName;
      currentMenuItem.menuItemCategory = menuItemCategory || currentMenuItem.menuItemCategory;
      currentMenuItem.menuItemDescription = menuItemDescription || currentMenuItem.menuItemDescription;
      currentMenuItem.menuItemPrice = menuItemPrice || currentMenuItem.menuItemPrice;
      currentMenuItem.menuItemImage = menuItemImage || currentMenuItem.menuItemImage;

      const updatedMenuItem = await currentMenuItem.save();

      if (updatedMenuItem) {
        return {
          success: true,
          statusCode: 200,
          message: "Menu updated Successfully"
        };
      } else {
        return {
          success: false,
          statusCode: 500,
          message: "Failed to fetch data"
        };
      }
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
