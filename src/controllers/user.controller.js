import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.models.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

//this is a internal method to generate
const generateAccessAndRefreshTokens= async(userId){
    try{
        const user=await User.findById(userId)
        const accessToken=user.generateAccessToken()//this is given to the user
        const refreshToken=user.generateRefreshToken()//but this is given to the database

        user.refreshToken=refreshToken//adding value in the suer as in the model it was written (refreshToken)
        user.save({validateBeforeSave: false})//while saving mongoose model kicks in means while saving this password kicks in 

        return {assessToken,refreshToken}

    }catch(error){
        throw new ApiError(500,"Something went wrong while generating refresh and access token")
    }
}

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
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering the User")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"user registered successfully")
    )

})

const loginUser=asyncHandler(async (req,res) => {
    //req body->data
    //username or email for base login
    //find the user
    //password check
    //access and refresh token generation
    //send cookie

    const {username,email,password}=req.body

    if(!( email || username )){
        throw new ApiError(400,"username or password is required")
    }
    const user=User.findOne({
        $or : [{username},{email}]
    })

    if(!user){
        throw new ApiError(404,"User doesn't exists")
    }

    const isPasswordValid=await user.isPasswordCorrect(password) //here we are using user instead of User as bcryt is our own created method not by mongoDb

    if(!isPasswordValid){
        throw new ApiError(401,"Invalid user credentials")
    }

    const {accessToken,refreshToken}= await generateAccessAndRefreshTokens(user._id)

    const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

    const options= {//means non modifiable(modified only by server)
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser , accessToken ,refreshToken
            },
            "User logged in successfully"
        )
    )

})

const logoutUser=  asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options= {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie('accessToken',options)
    .clearCookie('refreshToken',options)
    .json(new ApiResponse(200,{},"User Logged Out"))
    
})


export {
    registerUser,
    loginUser,
    logoutUser
}
