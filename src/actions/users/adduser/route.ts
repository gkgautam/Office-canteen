import connectDB from "@/db/connection";
import User from "@/models/menu.model";
import { sendMenuImageIntoCloud } from "@/utils/uploadImage";



export async function addUser(formData: FormData) {
    try {
      await connectDB(); // Ensure DB connection is established
  
      const firstName = formData.get("firstName");
      const lastName = formData.get("lastName");
      const email = formData.get("email");
      const password = formData.get("password");
      const phone = formData.get("phone");
      const profileImage = formData.get("profileImage") as File | null; // Type assertion
  
      if (!firstName || !password || !lastName || !email || !phone || !profileImage) {
        return {
          success: false,
          statusCode: 404,
          message: "Please provide all required details"
        };
      }
  
      const userExist = await User.findOne({ email });
  
      if (userExist) {
        return {
          success: false,
          statusCode: 400,
          message: "User Already Exists"
        };
      }
  
      let imageUrl: string | null = null;
  
      if (profileImage && profileImage as File) {
        // Upload image
        const uploadImage = await sendMenuImageIntoCloud(profileImage);
  
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
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        profileImage: imageUrl
      });
  
      const result = await newUser.save();
  
      if (result) {
        return {
          success: true,
          statusCode: 200,
          message: "User registered successfully"
        };
      } else {
        return {
          success: false,
          statusCode: 500,
          message: "Failed to register User"
        };
      }
  
    } catch (error: any) {
      console.error("Error adding User:", error);
      return {
        success: false,
        statusCode: 500,
        message: "Internal Server Error",
        error: error.message
      };
    }
  }
  