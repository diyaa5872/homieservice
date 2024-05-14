
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {Booking} from "../models/booking.models.js"
import { Request } from '../models/workrequest.models.js'; // Adjust the path accordingly
import { ApiResponse } from "../utils/ApiResponse.js";

const combinedHandler = asyncHandler(async (req, res) => {
    const { user_id, worker_id } = req.params;
    const { date, start, end,appointment_notes,address_user } = req.body;

    if (!date || !start || !end || !user_id || !worker_id) {
        throw new ApiError(400, "Missing required fields");
    }

    try {
        // Create a new instance of the Request model
        const newRequest = await Request.create({
            user_id,
            worker_id
            // Since workStatus and accepted are not provided, they will take their default values from the schema
        });

        // Convert date to ISO format
        const isoDate = new Date(date);
        // Create the booking using the Booking model

        const book = await Booking.create({
            user_id,
            date: isoDate,
            timeSlot: { start: start, end: end },
            address_user: "", // Assuming address_user is an array
            appointment_notes: appointment_notes || "not given",
            worker_id
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