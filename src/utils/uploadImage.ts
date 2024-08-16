import { Readable } from "stream";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
import os from "os";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const pump = promisify(pipeline);

// Convert File to a Readable Stream
function fileToStream(file: File): Readable {
  // Create a Readable stream from file's buffer
  const stream = new Readable();
  stream._read = () => { }; // _read is required but you can noop it
  file.arrayBuffer().then(buffer => {
    stream.push(Buffer.from(buffer));
    stream.push(null); // End of stream
  });
  return stream;
}

export async function sendMenuImageIntoCloud(file: File): Promise<string | null> {
  try {
    if (!file) {
      throw new Error("Please provide a valid file.");
    }

    const tempFolder = os.tmpdir();
    const prodFilePath = path.join(tempFolder, file.name);

    // Convert File to Readable Stream and write to temporary file
    const fileStream = fileToStream(file);
    await pump(fileStream, fs.createWriteStream(prodFilePath));

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(prodFilePath, { resource_type: "image" });

    // Clean up temporary file
    fs.unlinkSync(prodFilePath);

    // Return the secure URL of the uploaded image
    return uploadResult.secure_url;
  } catch (error) {
    console.error("Error uploading menu image to Cloudinary:", error);
    throw error;
  }
}

export async function deleteImagefromCloud(public_id: string) {
  try {
    // Ensure public_id is in an array format
    const deleteImage = await cloudinary.api.delete_resources([public_id], { resource_type: "image" });

    if (!deleteImage || deleteImage.deleted[public_id] !== 'deleted') {
      return { success: false, message: "Error deleting images from Cloudinary" };
    }

    return { success: true, message: "Image successfully deleted", data: deleteImage };

  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    return { success: false, message: "An error occurred while deleting the image", error };
  }
}