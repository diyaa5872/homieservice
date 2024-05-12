import mongoose from 'mongoose'

const reviewSchema=mongoose.Schema({
<<<<<<< HEAD
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
=======
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
>>>>>>> 83f9c920d9dcbc7af44db83533322e72ed7a11ef
        required: true
    },
    client_feedback: {
        type: String
    }
})

export const Review=mongoose.model("Review",reviewSchema);