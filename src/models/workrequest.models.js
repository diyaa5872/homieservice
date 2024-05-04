import mongoose from 'mongoose'

const workRequestSchema=new Schema({
    // jobId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Unique identifier for the job request
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // ID of the user who sent the job request
    jobDetails: { type: String, required: true }, // Details of the job being requested
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }, // Status of the job request
    accepted: { type: Boolean, default: false } // Indicates whether the request has been accepted by the worker
})

export const Request=mongoose.model('Request',workRequestSchema)