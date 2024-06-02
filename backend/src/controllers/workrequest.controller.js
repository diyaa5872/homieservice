import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {Request} from "../models/workrequest.models.js"
import {Booking} from "../models/booking.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import {Worker} from "../models/worker.models.js"
import { User } from "../models/user.models.js";

const acceptRequest = asyncHandler(async (req, res) => {
    const { workerId } = req.query;
    const { userId } = req.query;

    if(!userId || !workerId){
        throw new ApiError(400,"pass user_id and worker_id")
    }

    try {
        const request = await Request.findOne({ userId, workerId, accepted: false }).exec();
        
        if (request) {
            await Request.findByIdAndUpdate(request._id, {
                $set: {
                    accepted: true,
                    workStatus: "accepted"
                }
            });

        const booking = await Booking.findOne({userId,workerId,currentstatus:'pending'}).exec();
        if(booking){
            await Booking.findByIdAndUpdate(booking._id,{
                $set:{
                    currentstatus: "accepted"
                }
            })
        }    
            
            res.status(200).json({ success: true, message: "Request accepted successfully." });
        } else {
            res.status(404).json({ success: false, message: "Pending request not found." });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ error: "Invalid details", message: error.message || "An unexpected error occurred" });
    }
    }
);

const cancelRequest = asyncHandler(async (req, res) => {
    const { workerId, userId } = req.query;

    try {
        const request = await Request.findOne({ userId, workerId, workStatus: "pending" }).exec();
        const booking = await Booking.findOne({ userId, workerId, currentstatus: "pending" }).exec();

        if (request || booking) { // Check if either request or booking exists
            if (request) {
                await Request.findByIdAndDelete(request._id);
            }
            if (booking) {
                await Booking.findByIdAndDelete(booking._id);
            }
            res.status(200).json({ success: true, message: "Request and/or booking canceled successfully." });
        } else {
            res.status(404).json({ success: false, message: "Pending request and booking not found." });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ error: "Invalid details", message: error.message || "An unexpected error occurred" });
    }
});

const completedRequest = asyncHandler(async (req, res) => {
    const { workerId } = req.query
    const { userId } = req.query

    if(!userId || !workerId){
        throw new ApiError(400,"pass user_id and worker_id")
    }

    try {
        const booking = await Booking.findOne({userId,workerId,currentstatus:'accepted',isCompleted:'false' }).exec()

        if(booking){
            await Booking.findByIdAndUpdate(booking._id,{
                $set:{
                    isCompleted: true
                }
        })

            const user=await User.findOne({userId}).exec()
            if(user){
                await User.findByIdAndUpdate(user._id,{
                    $push:{
                        workerId: workerId
                    }
                })
            }

            const worker=await Worker.findOne({workerId}).exec()
            if(worker){
                await User.findByIdAndUpdate(user._id,{
                    $push:{
                        userId: userId
                    }
                })
            }
            res.status(200).json({ success: true, message: "booking completed successfully by worker." })
        } else {
            res.status(404).json({ success: false, message: "booking not found." })
        }
    } catch(error) {
        console.error("Error:", error);
        res.status(400).json({ error: "Invalid details", message: error.message || "An unexpected error occurred" });
    }
});


export {
    acceptRequest,
    cancelRequest,
    completedRequest
}