import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: { // Changed field name to match the controller
        type: Number
    },
    isVerified: { // Changed field name to follow camelCase convention
        type: Boolean,
        default: false
    },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, default: () => new Date(+new Date() + 5 * 60 * 1000) } 
});

export const Otp = mongoose.model("Otp", otpSchema);
