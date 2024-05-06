//only to verify if the user is present or not

import { ApiError } from "../utils/ApiError"
import {asyncHandler} from '../utils/asyncHandler'
import jwt from 'jsonwebtoken'
import {User} from "../models/user.model"

export const verifyJWT=asyncHandler(async(req,res,next)=>{
    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer","")//now we have access to the token
    
        if(!token){
            throw new ApiError(401,"Unauthorized Error")
        }
    
        const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user=await User.findById(decodedToken._id).select("-password -refreshToken")
    
        if(!user){
            throw new ApiError(404,"Invalid Access Token")
        }
    
        req.user=user;//accessing the user
        next()
    } catch (error) {
        throw new Api(401,error?.message || "Invali access token")
    }

})