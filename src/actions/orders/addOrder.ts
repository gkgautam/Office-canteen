"use server";

import connectDB from "@/db/connection";
import Order from "@/models/order.model";

// Your existing addMenu function
export async function addOrder(orderData: any) {
  try {
    await connectDB(); // Ensure DB connection is established

    const newOrder = new Order(orderData)
    const result = await newOrder.save();

    if (result) {
      return {
        success: true,
        statusCode: 201,
        message: "Order Placed"
      };
    }
    else {
      return {
        success: false,
        statusCode: 400,
        message: "Something went wrong !"
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
