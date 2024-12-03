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
    { type: String, required: true 
    },
    country: {
         type: String, required: true 
        },
    postalCode: {
         type: String, required: true 
    }
});

const userSchema=new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true//will be easy to locate any user
    },
    fullName: {
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
        required: [true,"passowrd is required"]
    },
    address_user: [addressSchema],
    otp_code: {
        type: mongoose.Schema.Types.ObjectId,
        ref:  "Otp"
    },
    workerId:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Worker"
    }],
    refreshToken: {
        type: String
    }
},{timestamps: true})

userSchema.pre("save", async function (next) {//pre is a hook to be worked before saving the data
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){//can add more our own methods using .methods
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
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
userSchema.methods.generateRefreshToken = function(){
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

export const User = mongoose.model("User", userSchema)
