"use server";

import connectDB from "@/db/connection";
import Order from "@/models/order.model";

export async function updateOrderStatus(orderId: any, orderStatus: string) {
  try {

    connectDB();

    if (orderStatus === "") {
      return { message: "Invalid Data", success: false }
    }

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { orderStatus: orderStatus }, { new: true });

    if (updatedOrder) {
      return { message: "success", success: true }
    }
    else {
      return { message: "Invalid Data", success: false }
    }


  } catch (error) {
    return { message: "Server Failed", success: false, error: error }
  }
}