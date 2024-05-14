import mongoose from 'mongoose'
import { User }  from './user.models.js';

const workRequestSchema=new mongoose.Schema({
    // jobId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Unique identifier for the job request

    workStatus: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' ,required: true}, // Status of the job request
    accepted: { type: Boolean, default: false ,required: true }, // Indicates whether the request has been accepted by the worker
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true }, // ID of the user who sent the job request
    worker_id: { type: mongoose.Schema.Types.ObjectId,  ref: 'Worker' ,required:  true},// Details of the job being requested
})

export const Request=mongoose.model('Request',workRequestSchema)

