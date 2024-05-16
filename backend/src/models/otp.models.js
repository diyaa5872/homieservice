import mongoose from 'mongoose';

const otpSchema=new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: () => new Date(+new Date() + 5 * 60 * 1000) } 
});

export const Otp = mongoose.model("Otp", otpSchema);