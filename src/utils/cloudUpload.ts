import fs from "node:fs";
import { cloudinary } from "../config";

const cloudUpload = async (filePath: string) => {
  const response = await cloudinary.uploader
    .upload(filePath, {
      resource_type: "auto",
      folder: "screenshots",
    })
    .catch((error) => {
      throw error;
    });

  fs.unlinkSync(filePath);
  return response;
};

export default cloudUpload;
