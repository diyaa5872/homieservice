import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

export {uploadOnCloudinary};

// export {uploadOnCloudinary}

// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";

// cloudinary.config({ 
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key: process.env.CLOUDINARY_API_KEY, 
//     api_secret: process.env.CLOUDINARY_API_SECRET 
// });

// const uploadOnCloudinary = async (localFilePaths) => {
//     try {
//         if (!localFilePaths || !Array.isArray(localFilePaths)) return [];

//         const uploadedUrls = [];

//         for (const localFilePath of localFilePaths) {
//             if (!localFilePath) continue;

//             // Upload the file on Cloudinary
//             const response = await cloudinary.uploader.upload(localFilePath, {
//                 resource_type: "auto"
//             });

//             // Push the URL of the uploaded file to the array
//             uploadedUrls.push(response.url);

//             // Remove the locally saved temporary file
//             fs.unlinkSync(localFilePath);
//         }

//         return uploadedUrls;
//     } catch (error) {
//         // Remove the locally saved temporary files if any upload operation fails
//         for (const localFilePath of localFilePaths) {
//             if (localFilePath) fs.unlinkSync(localFilePath);
//         }
//         return [];
//     }
// };

// export { uploadOnCloudinary };
