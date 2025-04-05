import { asyncHandler } from "../utils/asyncHandler.js";
import {User} from "../models/user.models.js";
import { ApiError } from "../utils/ApiErrorHandle.js";
import {cloudinaryUpload} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse";


const registerUser = asyncHandler (async (req, res) =>{

    console.log("Uploaded Files:", req.files);

   const {userName,email,fullName,password}= req.body
   console.log(email);


   if(fullName ==="" ){
    throw new ApiError(400,"fullName is required")
   }
   if(userName ==="" ){
    throw new ApiError(400,"userName is required")
   }
   if(email ==="" ){
    throw new ApiError(400,"email is required")
   }
   if(password ==="" ){
    throw new ApiError(400,"password is required")
   }

   const existedUser = await User.findOne({
    $or:[{ email },{ userName}]
    
    
   })

    if(existedUser){
     throw new ApiError(400,"user already exists")
    }

    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
throw new ApiError(400,"avatar1 is required")
    }

//    const avatar = await cloudinaryUpload(avatarLocalPath)

console.log("avatarLocalPath:", avatarLocalPath);
const avatar = await cloudinaryUpload(avatarLocalPath);
console.log("Cloudinary avatar response:", avatar);

   const coverImage = await cloudinaryUpload(coverImageLocalPath)

   if(!avatar  || !avatar.url){
    throw new ApiError(400,"avatar is required")
   }

   const newUser = await User.create(
    {
        userName:userName.toLowerCase(),
        email,
        fullName,
        password,
        avatar:avatar.url,
        coverImage:coverImage?.url  || ""
    }
   )

   const createdUser = await User.findById(newUser._id).select("-password -refreshToken")

   if(!createdUser){
    throw new ApiError(500,"user not created")
   }

   return res.status(201).json(
    new ApiResponse(200,createdUser,"user created successfully")
   )
})

export {registerUser}