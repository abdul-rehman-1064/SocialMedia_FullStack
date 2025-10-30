import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs';

const uploadOnCloudinary = async (file, folder) => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        const options = {
            folder: folder,
            resource_type: "auto",
        };
        const result = await cloudinary.uploader.upload(file, options);

        fs.unlinkSync(file); 

        return result.secure_url;
    } catch (error) {
        fs.unlinkSync(file); 
        console.error('Cloudinary Upload Error:', error);
    }
}

export default uploadOnCloudinary;