import mongoose from 'mongoose'

const reviewSchema=mongoose.Schema({
    worker_id:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Worker',
        required: true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    client_feedback: {
        type: String
    }
})

export const Review=mongoose.model("Review",reviewSchema);