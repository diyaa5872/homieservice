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