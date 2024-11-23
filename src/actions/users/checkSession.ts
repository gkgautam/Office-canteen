"use server";

import connectDB from "@/db/connection";
import User from "@/models/user.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function checkSession() {

  try {

    connectDB();

    const cookie = cookies();

    const token = cookie.get("token")?.value;

    if (!token) {
      return {
        success: false,
        statusCode: 400,
        message: "User not logged in"
      }
    }

    const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY!);

    if (!verifyToken) {
      return {
        success: false,
        statusCode: 400,
        message: "Authentication Failed"
      }
    }

    const { id, email } = verifyToken as { id: string, email: string };

    const checkAdmin = await User.findOne({ email });

    if (!checkAdmin) {
      return {
        success: false,
        statusCode: 400,
        message: "User not found"
      }
    }

    return {
      success: true,
      statusCode: 200,
      message: "Authentication Success",
      session: { id, email }
    }


  } catch (error:any) {
    if (error.message === "signature verification failed") {
      return {
        success: false,
        statusCode: 500,
        message: "Invalid token authentication failed"
      }
    }
    return {
      success: false,
      error: error.message,
      statusCode: 500,
      message: "Internal Server Error"
    }
  }
}