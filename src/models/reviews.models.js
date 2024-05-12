import mongoose from 'mongoose'

const reviewSchema=mongoose.Schema({
    workerId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worker',
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: String,
    },    
    client_feedback: {
        type: String
    }
})

export const Review=mongoose.model("Review",reviewSchema);