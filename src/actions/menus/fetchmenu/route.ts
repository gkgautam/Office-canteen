"use server";

import connectDB from "@/db/connection";
import Menu from "@/models/menu.model";

// Your existing addMenu function
export async function getMenu() {
  try {
    await connectDB(); // Ensure DB connection is established

    const allData = await Menu.find({});

    if (allData) {
      return {
        success: true,
        statusCode: 200,
        message: "all data fetched",
        data: allData
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

export async function getCurrentMenuItem(id:string) {
  try {
    await connectDB(); // Ensure DB connection is established

    const currentMenuItem = await Menu.findById({_id:id});


    if (currentMenuItem) {
      return {
        success: true,
        statusCode: 200,
        message: "current data fetched",
        data:currentMenuItem
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