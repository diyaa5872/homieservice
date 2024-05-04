import mongoose from 'mongoose'

const addressSchema = new mongoose.Schema({
    street: {
         type: String, required: true 
    },
    city: { 
        type: String, required: true 
    },
    state: 
    { type: String, required: true 

    },
    country: {
         type: String, required: true 
        },
    postalCode: {
         type: String, required: true 
    }
});

const workerSchema=new Schema({
    worker_name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true//will be easy to locate any user
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    cover_image: {
        type: String, //cloudinary url
    },
    occupation: {

    },
    address_user: [addressSchema],
    age: {
        type: Number
    },
    experience_years: {
        type: Number,
        required: true,
        default: 0
    },
    shop_pictures: {
        type: String,
        // required: true
    },
    home_visit_fee: {
        type: Number,
        required: true,
        default: 0
    },
    otp_code: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "Otp"
    },
    contact_no: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Worker"
    }
},{timestamps: true})

export const User=mongoose.model("User",userSchema)