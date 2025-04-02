import {v2 as cloudinary } from "cloudinary";
import fs from "fs";


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


 const cloudinaryUpload = async  (LocalFilePath) =>{

 try{
if(!LocalFilePath) return null
const response = await cloudinary.uploader.upload(LocalFilePath,{resource_type:"auto"})

//file uploaded
console.log("File Uploaded Successfully",response.url);
return response;


 } catch(error){
    fs.unlinkSync(LocalFilePath) //remove the local file
    return null;



 }


 }

 export {cloudinaryUpload}


    
    // Upload an image
    //  const uploadResult = await cloudinary.uploader
    //    .upload(
    //        'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
    //            public_id: 'shoes',
    //        }
    //    )
    //    .catch((error) => {
    //        console.log(error);
    //    });
    
    // console.log(uploadResult);
    
    