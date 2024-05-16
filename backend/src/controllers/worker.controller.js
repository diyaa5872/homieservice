import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Worker } from "../models/worker.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await Worker.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

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

    const user = await Worker.findOne({
        $or: [{username}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "Worker does not exist")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Worker credentials")
    }

   const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await Worker.findById(user._id).select("-password -refreshToken")

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
            "Worker logged In Successfully"
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
    .json(new ApiResponse(200, {}, "Worker logged Out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.ACCESS_TOKEN_SECRET);

        const user = await Worker.findById(decodedToken?._id);

        if (!user || incomingRefreshToken !== user.refreshToken) {
            throw new ApiError(401, "Refresh token is invalid");
        }

        const { accessToken, newRefreshToken } = await generateAccessAndRefereshTokens(user._id);

        const options = {
            httpOnly: true,
            secure: true
        };

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json(new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, "Access token refreshed"));
    } catch (error) {
        throw new ApiError(401, error.message || "Invalid refresh token");
    }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    // Find the worker by ID
    const user = await Worker.findById(req.user?._id);

    // Check if the worker exists
    if (!user) {
        throw new ApiError(404, "Worker not found");
    }

    // Verify the old password
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    // If the old password is incorrect, throw an error
    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password");
    }

    // Update the password and save the worker
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"));
});
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
    const {fullName,email,experienceYears,homeVisitFee,description}= req.body

    if(!fullName || !email || !experienceYears || !homeVisitFee || !description){
        throw new ApiError(400,"All fields are required")
    }

    const user=await Worker.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email,
                experienceYears,
                homeVisitFee,
                description
            }
        },
        {new: true}

    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200,user,"Account details updated successfully"))
})

const updateUserCoverImage = asyncHandler(async(req, res) => {
    const coverImageLocalPath = req.file?.path

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover image file is missing")
    }

    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!coverImage.url) {
        throw new ApiError(400, "Error while uploading on cover image")
        
    }

    const user = await Worker.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                coverImage: coverImage.url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "Cover image updated successfully")
    )
})

const updateUserShopPictures = asyncHandler(async(req, res) => {
    const shopPicturesLocalPath = req.file?.path

    if (!shopPicturesLocalPath) {
        throw new ApiError(400, "shop pictures file is missing")
    }

    const shopPictures = await uploadOnCloudinary(shopPicturesLocalPath)

    if (!shopPictures.url) {
        throw new ApiError(400, "Error while uploading shop pictures")
        
    }

    const user = await Worker.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                shopPictures: shopPictures.url
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, user, "shop images updated successfully")
    )
})

// const deleteShopPictures = asyncHandler(async (req, res) => {
//     const user = await Worker.findByIdAndUpdate(

//         req.user?._id,
//         {
//             $unset: {
//                 shopPictures: "" // Remove the shopPictures field
//             }
//         },
//         { new: true }
//     ).select("-password");

//     if (!user) {
//         throw new ApiError(404, "User not found");
//     }

//     return res
//         .status(200)
//         .json(new ApiResponse(200, user, "All shop images deleted successfully"));
// });

const deleteShopPictures = asyncHandler(async (req, res) => {
    const user = await Worker.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                shopPictures: [] // Set the shopPictures field to an empty array
            }
        },
        { new: true }
    ).select("-password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user, "All shop images deleted successfully"));
});


export {
    registerWorker,
    loginWorker,
    logoutWorker,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserCoverImage,
    updateUserShopPictures,
    deleteShopPictures
};
