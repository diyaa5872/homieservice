import mongoose from 'mongoose'

const otpSchema=new Schema({
    user_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:  true
    },
    otp_code: {
        type: String,
        required: true
    },
    is_Verified: {
        type: Boolean,
        default: false
    },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: () => new Date(+new Date() + 5 * 60 * 1000) } 
})

export const Otp=mongoose.model("Otp",otpSchema)