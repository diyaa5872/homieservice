import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { useParams } from "react-router-dom";


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler( async (req, res) => {

    const { fullName, email, username, password} = req.body;

    if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    const user = await User.create({
        fullName,
        email, 
        password,
        username: username.toLowerCase()
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
    
} )

// const addressUser = asyncHandler(async (req, res) => {
//     const { street, city, state, country, postalcode } = req.body;
//     const userId = req.params.userId; 

//     if ([street, city, state, country, postalcode].some((field) => field?.trim() === "")) {
//         throw new ApiError(400, "All fields are required for address");
//     }

//     // Assuming you have the `userId`, you can use it to find the user
//     const existedUser = await User.findById(userId);

//     if (!existedUser) {
//         throw new ApiError(404, "User not found");
//     }

//     existedUser.address_user.push({
//         street,
//         city,
//         state,
//         country,
//         postalcode
//     });

//     // Save the user
//     await existedUser.save();

//     const updatedUser = await User.findById(userId).select("-password -refreshToken");

//     if (!updatedUser) {
//         throw new ApiError(500, "Something went wrong while entering the address");
//     }

//     return res.status(201).json(
//         new ApiResponse(200, updatedUser, "Address entered Successfully")
//     );
// });

const loginUser = asyncHandler(async (req, res) => {
    // req body -> data
    // email
    // find the user
    // password check
    // access and refresh token
    // send cookie

    const { email, password } = req.body;
    console.log(email);

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                "User logged in successfully"
            )
        );
});

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const refreshAccessToken= asyncHandler(async (req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken//sent by user

    if(!incomingRefreshToken){
        throw new ApiError(401,"unauthorised request")
    }

    try {
        const decodedToken=jwt.verify(
            incomingRefreshToken,
            process.env.ACCESS_TOKEN_SECRET
        )
    
        const user=await User.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiError(401,"unauthorised request")
        }
    
        //now need to match the token sent byb user and the previous token
        
        if(incomingRefreshToken != user?.refreshToken){
            throw new ApiError(401,"Refresh Token is expired or used")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken,newRefreshToken}=await generateAccessAndRefereshTokens(user._id)
    
        return res
        .status(200)
        .cookie("accessToken",accessToken)
        .cookie("refreshToken",newRefreshToken,options)
        .json(
            new ApiResponse(
                200,
                {accessToken,refreshToken: newRefreshToken},
                "Access token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid refresh token")
    }}
)

const changeCurrentPassword = asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword} =req.body
    
    const user=await User.findById(req.user?._id)
    const isPasswordCorrect=user.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(400,"Invalid old passowrd")
    }

    user.password=newPassword
    await user.save({
        validateBeforeSave: false
    })

    return res
    .status(200)
    .json(new ApiResponse(200,{},"Password changed successfully"))

})

const getCurrentUser = asyncHandler(async(req, res) => {
    return res
    .status(200)
    .json(new ApiResponse(
        200,
        req.user,
        "User fetched successfully"
    ))
})

const updateAccountDetails=asyncHandler(async(req,res)=>{//this is for the updation of text based data
    const {fullName,email}= req.body

    if(!fullName || !email){
        throw new ApiError(400,"All fields are required")
    }

    const user=User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email
            }
        },
        {new: true}

    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200,user,"Account details updated successfully"))
})

const addAddress = asyncHandler(async (req, res) => {
    const { street, city, state, country, postalCode } = req.body;

    if (!street || !city || !state || !country || !postalCode) {
        throw new ApiError(400, "All address fields are required");
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $push: {
                address_user: {
                    street,
                    city,
                    state,
                    country,
                    postalCode
                }
            }
        },
        { new: true }
    ).select("-password");

    return res.status(200).json(new ApiResponse(200, user, "Address added successfully"));
});

const updateUserCoverImage=asyncHandler(async(req,res)=>{
    const coverImageLocalPath=req.file?.path

    if(!coverImageLocalPath){
        throw new ApiError(400,"CoverImage file is missing")
    }

    const coverImage=await uploadOnCloudinary(coverImageLocalPath)//uploaded

    if(!coverImage.url){
        throw new ApiError(400,"Error while uploading cover image")
    }

    const user=await User.findOneAndUpdate(
        req.user._id,//showing error
        {
            $set:{
                coverImage:coverImage.url
            }
        },
        {new: true}
    ).select("-password")

    if (!user) {
        throw new ApiError(404, "User not found"); // Handle case where user is not found
    }


    return res
    .status(200)
    .json(new ApiResponse(200, user, "Cover image updated successfully"));
})

const getThatUser=asyncHandler(async (req,res)=>{
    try {
        const { id } = req.query; // Change to req.query to get query parameters
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    getCurrentUser,
    updateAccountDetails,
    addAddress,
    updateUserCoverImage,
    changeCurrentPassword,
    getThatUser
}
