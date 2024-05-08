import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Worker } from "../models/worker.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const registerWorker = asyncHandler(async (req, res) => {
        const { fullName, email, username, password, street, city, state, country, postalCode, user_id, occupation, age, experienceYears, homeVisitFee, otp_code, contact_no, description } = req.body;

        // Check if any required field is empty
        if (![fullName, email, username, password, street, city, state, country, postalCode, user_id, occupation, age, experienceYears, homeVisitFee, otp_code, contact_no, description].every(field => field && field.trim() !== "")) {
            throw new ApiError(400, "All fields are required");
        }

        // Check if user with email or username already exists
        const existedWorker = await Worker.findOne({ $or: [{ username }, { email }] });
        if (existedWorker) {
            throw new ApiError(409, "User with email or username already exists");
        }

    // Upload cover image to Cloudinary if provided
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!coverImageLocalPath) {
        throw new ApiError(400, "cover image file is required")
    }

    const coverImage= await uploadOnCloudinary(coverImageLocalPath)//issue

    const shopPictureUrls = [];
    if (req.files && Array.isArray(req.files.shopPictures)) {
        for (const shopPicture of req.files.shopPictures) {
            const shopPictureLocalPath = shopPicture.path;
            const shopPictureResult = await uploadOnCloudinary(shopPictureLocalPath);
            shopPictureUrls.push(shopPictureResult.url);
        }
    }

        // Create new worker
        const worker = await Worker.create({
            fullName,
            email,
            username: username.toLowerCase(),
            password,
            age,
            experienceYears,
            homeVisitFee,
            contact_no,
            description,
            occupation,
            address_worker: {
                street: street || "",
                city: city || "",
                state: state || "",
                country: country || "",
                postalCode: postalCode || ""
            },
            otp_code: otp_code || "",
            user_id: user_id || "",
            coverImage: coverImage?.url || "",
            shopPictures: shopPictureUrls || ""
        });

        const createdUser = await Worker.findById(worker._id).select(
            "-password -refreshToken"
        )
    
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the Worker")
        }
    
        return res.status(201).json(
            new ApiResponse(200, createdUser, "Worker registered Successfully")
        )
});

const loginWorker = asyncHandler(async (req, res) =>{
    // req body -> data
    // username or email
    //find the user
    //password check
    //access and referesh token
    //send cookie

    const {email, username, password} = req.body
    console.log(email);

    if (!username && !email) {
        throw new ApiError(400, "username or email is required")
    }
    
    // Here is an alternative of above code based on logic discussed in video:
    // if (!(username || email)) {
    //     throw new ApiError(400, "username or email is required")
        
    // }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

const logoutWorker = asyncHandler(async(req, res) => {
    await Worker.findByIdAndUpdate(
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


export {
    registerWorker,
    loginWorker,
    logoutWorker
};
