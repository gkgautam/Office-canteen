"use server";

import connectDB from "@/db/connection";
import Order from "@/models/order.model";

export async function getAllMyOrders(myEmail: string) {
  try {
    await connectDB(); // Ensure DB connection is established

    const allMyOrders = await Order.find({ 'paymentDetails.order_by_email': myEmail });

    if (allMyOrders) {
      return {
        success: true,
        statusCode: 201,
        message: "all orders fetched",
        data: allMyOrders
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
