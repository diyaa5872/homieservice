
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {Review} from "../models/reviews.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const createReview = asyncHandler(async (req, res) => {
    const { rating, client_feedback } = req.body; // Only body parameters are used here

    const worker_id = req.params.worker_id; // Access workerId from URL params
    const user_id = req.params.user_id; // Access userId from URL params

    if (![worker_id, user_id, rating, client_feedback].every((field) => field && field.trim() !== "")) {
        throw new ApiError(400, "All fields are required");
    }

    try {
        // Create a new review instance
        const newReview = await Review.create({
            worker_id,
            user_id,
            rating,
            client_feedback
        });

        // Save the review to the database
        const savedReview = await newReview.save();

        // Respond with success message and the saved review
        return res.status(201).json(
            new ApiResponse(201, savedReview, "Review created successfully")
        );
    } catch (error) {
        // Handle any errors that occur during the process
        console.error("Error:", error);
        res.status(400).json({ error: "Invalid details", message: error.message || "An unexpected error occurred" });
    }
});

const deleteReview=asyncHandler(async (req, res) => {
    const rating_id=req.params._id

    try {
        const deletedReview = await Review.findOneAndDelete(rating_id);
    
        if (!deletedReview) {
            throw new ApiError(404, 'Review not found');
        }
    
        res.status(200).json({
            success: true,
            message: 'Review deleted successfully'
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ error: "Invalid details", message: error.message || "An unexpected error occurred" });
    }
});
export {
    createReview,
    deleteReview
}