<<<<<<< HEAD
import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {Review} from "../models/reviews.models.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {User} from "../models/user.models.js"
import mongoose from "mongoose";

const createReview= asyncHandler(async (req,res)=>{
    
        // Extract workerId from request parameters
        const { workerId,userId } = req.params;
    
        // Check if required fields are present in the request body
        const { rating, client_experience } = req.body;
        if (!rating || !client_experience) {
            throw new ApiError(400, "Rating and client experience are required fields");
        }
    
        // Create a new review instance
        const newReview = await Review.create({
            userId,
            workerId,
            rating,
            client_experience
        });
    
        // Save the review to the database
        const savedReview = await newReview.save();
    
        // Respond with success message and the saved review
        return res.status(201).json({
            success: true,
            message: "Review created successfully",
            review: savedReview
        })
=======
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {Review} from "../models/reviews.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const createReview= asyncHandler(async (req,res)=>{

    const { worker_id, client_id , rating ,client_feedback } = req.body;

    if ([ worker_id , client_id , rating , client_feedback ].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    try {
        // Create a new review instance
        const newReview = await Review.create({
                worker_id,
                client_id,
                rating,
                client_feedback
        })

        // Save the review to the database
        const savedReview = await newReview.save();

        // Respond with success message and the saved review
        return res.status(201).json(
            new ApiResponse(201, savedReview, "Review created successfully")
        );
    } catch (error) {
        // Handle any errors that occur during the process
        throw new ApiError(500, "Failed to create review", error);
    }
>>>>>>> 83f9c920d9dcbc7af44db83533322e72ed7a11ef
})

const deleteReview=asyncHandler(async (req, res) => {
    const { reviewId } = req.params;

    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
        throw new ApiError(404, 'Review not found');
    }

    res.status(200).json({
        success: true,
        message: 'Review deleted successfully'
    });
});

export {
    createReview,
    deleteReview
}