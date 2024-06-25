import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const addressSchema = new mongoose.Schema({
    street: {
         type: String, required: true 
    },
    city: { 
        type: String, required: true 
    },
    state: 
    { 
        type: String, required: true 
    },
    country: {
         type: String, required: true 
        },
    postalCode: {
         type: String, required: true 
    }
});

const workerSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true//will be easy to locate any user
    },
    fullName:{
        type: String,
        required: true,
        trim:  true,
        index:  true
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
        required: [true,"password is required"]
    },
    coverImage: {
        type: String, //cloudinary url
        required: true
    },
    occupation: {
        type: String,
        enum: ['plumber','electrician', 'carpenter', 'home maker', 'contractor','painter','wall putty'],
        required: true
    },
    address_worker: [addressSchema],
    age: {
        type: Number,
        default: 0
    },
    experienceYears: {
        type: Number,
        required: true,
        default: 0
    },
    shopPictures: {
        type: [String]
        // required: true
    },
    homeVisitFee: {
        type: Number,
        required: true,
        default: 0
    },
    otp_code: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "Otp"
    },
    contact_no: {
        type: [String],
        required: true
    },
    description: {
        type: String
    },
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    refreshToken: {
        type: String
    }
},{timestamps: true})

workerSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

workerSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

workerSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
workerSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const Worker=mongoose.model("Worker",workerSchema)