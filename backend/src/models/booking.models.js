import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User (client) model
    workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true }, // Reference to Worker model
    date: { type: Date, required: true }, // Date of the booking
    timeSlot: {
        start: { type: String, required: true }, // Start time of the booking
        end: { type: String, required: true } // End time of the booking
    },
    address: { type: String,required: true }, // Address where the service will be provided
    notes: { type: String }, // Additional notes or instructions for the appointment
    currentstatus: {
        type: String,
        enum: ['pending', 'accepted'],
        default: 'pending',
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
});

export const Booking = mongoose.model("Booking", bookingSchema)