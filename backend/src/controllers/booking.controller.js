
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {Booking} from "../models/booking.models.js"
import { Request } from '../models/workrequest.models.js'; // Adjust the path accordingly
import { ApiResponse } from "../utils/ApiResponse.js";

const combinedHandler = asyncHandler(async (req, res) => {
    const { userId, workerId } = req.query;
    const { date, start, end,notes,address } = req.body;

    if (!date || !start || !end || !userId || !workerId) {
        throw new ApiError(400, "Missing required fields");
    }

    try {
        // Create a new instance of the Request model
        const newRequest = await Request.create({
            userId,
            workerId
            // Since workStatus and accepted are not provided, they will take their default values from the schema
        });

        // Convert date to ISO format
        const isoDate = new Date(date);
        // Create the booking using the Booking model

        const book = await Booking.create({
            userId,
            date: isoDate,
            timeSlot: { start: start, end: end },
            address: address, // Assuming address_user is an array
            notes: notes || "not given",
            workerId
        })

        await book.save()
        await newRequest.save()

        // Do something with 'book', like sending it as a response
        res.status(201).json({
            message: "Request and booking created successfully",
            request: newRequest,
            booking: book
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ error: "Invalid details", message: error.message || "An unexpected error occurred" });
    }
});

export {
    combinedHandler
}