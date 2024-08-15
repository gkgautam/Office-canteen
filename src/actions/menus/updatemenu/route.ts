"use server";

import connectDB from "@/db/connection";
import Menu from "@/models/menu.model";
import { sendMenuImageIntoCloud } from "@/utils/uploadImage";

interface CanteenAddMenuFormProps {
    menuItemName: string;
    menuItemCategory: string;
    menuItemDescription: string;
    menuItemPrice: number;
    menuItemImage: File | null; // Changed type to File | null
  }
// Your existing addMenu function
export async function updateCurrentMenuItem(id:string,updateData:CanteenAddMenuFormProps) {
  try {
    await connectDB(); // Ensure DB connection is established

    // console.log('batman:',id,updateData);

    // let imageUrl: string | null = null;

    // if (updateData.menuItemImage && updateData.menuItemImage as File) {
    //   // Upload image
    //   const uploadImage = await sendMenuImageIntoCloud(updateData.menuItemImage);

    //   if (uploadImage) {
    //     imageUrl = uploadImage;
    //   } else {
    //     return {
    //       success: false,
    //       statusCode: 500,
    //       message: "Failed to upload image"
    //     };
    //   }
    // }

    const currentMenuItem : any = await Menu.findById({_id:id});
    currentMenuItem.menuItemName = updateData.menuItemName || currentMenuItem.menuItemName;
    currentMenuItem.menuItemCategory = updateData.menuItemCategory || currentMenuItem.menuItemCategory;
    currentMenuItem.menuItemDescription = updateData.menuItemDescription || currentMenuItem.menuItemDescription;
    currentMenuItem.menuItemPrice = updateData.menuItemPrice || currentMenuItem.menuItemPrice;
    currentMenuItem.menuItemImage = updateData.menuItemImage || currentMenuItem.menuItemImage;

    // 3. Save the updated document
    const updatedMenuItem = await currentMenuItem.save();
    // console.log('batman:',currentMenuItem);


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
