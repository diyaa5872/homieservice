import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {Request} from "../models/workrequest.models.js"
import {Booking} from "../models/booking.models.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import {Worker} from "../models/worker.models.js"
import { User } from "../models/user.models.js";

// const request = asyncHandler(async (req, res) => {
//     const { workStatus, accepted } = req.body
//     const {user_id}=req.params
//     const {worker_id}=req.params
//     console.log(workStatus);
//     console.log(accepted);

//     if (!workStatus || !accepted) {
//         throw new ApiError(400, "workStatus or accepted field is required to be filled");
//     }

//     try {
//         // Create a new instance of the Request model
//         const newRequest = await Request.create({
//             user_id,
//             worker_id,
//             accepted
//         });

//         await newRequest.save();

//         return res.status(201).json(
//             new ApiResponse(201, newRequest, "Request sent successfully")     
//         );
//     } catch (error) {
//         // Handle any errors that occur during the process
//         console.error("Error:", error);
//         res.status(400).json({ error: "Invalid details", message: error.message || "An unexpected error occurred" });
//     }
// });

const acceptRequest = asyncHandler(async (req, res) => {
    const { worker_id } = req.query;
    const { user_id } = req.query;

    if(!user_id || !worker_id){
        throw new ApiError(400,"pass user_id and worker_id")
    }

    try {
        const request = await Request.findOne({ user_id, worker_id, accepted: false }).exec();
        
        if (request) {
            await Request.findByIdAndUpdate(request._id, {
                $set: {
                    accepted: true,
                    workStatus: "accepted"
                }
            });

        const booking = await Booking.findOne({user_id,worker_id,currentstatus:'pending'}).exec();
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
    const { worker_id, user_id } = req.query;

    try {
        const request = await Request.findOne({ user_id, worker_id, workStatus: "pending" }).exec();
        const booking = await Booking.findOne({ user_id, worker_id, currentstatus: "pending" }).exec();

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
    const { worker_id } = req.query
    const { user_id } = req.query

    if(!user_id || !worker_id){
        throw new ApiError(400,"pass user_id and worker_id")
    }

    try {
        const booking = await Booking.findOne({user_id,worker_id,currentstatus:'accepted',isCompleted:'false' }).exec()

        if(booking){
            await Booking.findByIdAndUpdate(booking._id,{
                $set:{
                    isCompleted: true
                }
        })

            const user=await User.findOne({user_id}).exec()
            if(user){
                await User.findByIdAndUpdate(user._id,{
                    $push:{
                        worker_id: worker_id
                    }
                })
            }

            const worker=await Worker.findOne({worker_id}).exec()
            if(worker){
                await User.findByIdAndUpdate(user._id,{
                    $push:{
                        user_id: user_id
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