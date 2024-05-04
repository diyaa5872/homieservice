import mongoose from 'mongoose'

const bookingSchema=new Schema({
    client_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, // Reference to User (client) model
    worker_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Worker' }, // Reference to Worker model
    date: { type: Date, required: true }, // Date of the booking
    timeSlot: {
         type: Number, required: true 
    }, // Time of the booking
    address_client: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
     }, // Address where the service will be provided
    appointment_notes: { type: String }, // Additional notes or instructions for the appointment
})

export const Booking=mongoose.Schema("Booking",bookingSchema)