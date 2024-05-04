import mongoose from 'mongoose'

const reviewSchema=new Schema({
    worker_id:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'worker',
        required: true
    },
    client_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
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