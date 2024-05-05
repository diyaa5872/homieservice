import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.models.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser=asyncHandler(async (req,res)=>{
    //get user details from frontend
    //validation-not empty
    //check if user already 
    //check for images 
    //upload them to cloudinary 
    //create user object-create entry in db
    //remove password field from response
    //check for user creation
    //return res

    const {username,email,password}=req.body
    console.log("Email:",email)

    if(
        [fullname,email,username,password].some((field)=>
        field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required")
    }

    const existedUser=User.findOne({
        $or : [{ username },{ email }]
    })
    console.log(existedUser);

    if(existedUser){
        throw new ApiError(409,"User with email or username already exists");
    }
    console.log(req.files);

    const coverImageLocalPath=req.files?.cover_image?.path;

    if(!coverImageLocalPath){
        throw new ApiError(400,'CoverImage file is required');
    }

    const cover_image=await uploadOnCloudinary(coverImageLocalPath)

    if(!cover_image){
        throw new ApiError(400,"cover_image is required");
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email: email,
        password: password,
        cover_image: cover_image?.url || "",
        address_user: [
            {
                street: "street",
                city: "city",
                state: "state",
                country: "country",
                postalCode: "postalcode"
            }
        ],
        otp_code: otp_code,
        worker_id: worker_id
    })

    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken -worker_id -otp_code -address_user -cover_image"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the User")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"user registered successfully")
    )

})

export {
    registerUser,
}
