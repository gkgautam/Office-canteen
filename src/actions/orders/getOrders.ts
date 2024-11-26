"use server";

import connectDB from "@/db/connection";
import Order from "@/models/order.model";

export async function getOrders() {
  try {
    await connectDB(); // Ensure DB connection is established

    const allOrders = await Order.find({});

    if (allOrders) {
      return {
        success: true,
        statusCode: 201,
        data: JSON.stringify(allOrders)
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
