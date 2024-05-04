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

const userSchema=new Schema({
    username: {
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
    password: {
        type: String,
        required: [true,"passowrd is required"]
    },
    cover_image: {
        type: String, //cloudinary url
    },
    address_user: [addressSchema],
    otp_code: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "Otp"
    },
    worker_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Worker"
    }
},{timestamps: true})

export const User=mongoose.model("User",userSchema)