import mongoose from 'mongoose'
import jwt from 'jsonwenytoken'
import bcrypt from 'bcrtpt'

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

userSchema.pre('save',async function(next){//here ,next means that after all the above happened then next runs and other thing is,make it like when we are sending password then only save it otherwise not when we are changing some other thing in schema
    if(!this.isModified('password')) return next();

    this.password=bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

export const User=mongoose.model("User",userSchema)