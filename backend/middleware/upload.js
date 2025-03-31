  import dotenv from 'dotenv';
  import multer from 'multer';
  import { v2 as cloudinary } from 'cloudinary';
  import fs from 'fs';

  dotenv.config();


  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const upload = multer({ dest: 'uploads/' });

  const uploadToCloudinary = async (filePath) => {
    try {
      const result = await cloudinary.uploader.upload(filePath, { folder: 'uploads' });
      fs.unlinkSync(filePath); 
      return result.secure_url; 
    } catch (error) {
      throw new Error('Cloudinary upload failed');
    }
  };

  export { upload, uploadToCloudinary };
