import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import nodemailer from 'nodemailer'
import {User} from '../models/user.models.js'
import {Otp} from '../models/otp.models.js'

//email config
const  transporter=nodemailer.createTransport({
    service:"gmail",
    secure: true,
    port: 465,
    auth: {
        user:process.env.EMAIL,
        pass:process.env.PASSWORD
    }
})


const userOtp =asyncHandler(async(req,res)=>{
    const {email}=req.body
    console.log("Recieved email: ",email);
 
    if (!email) {
        throw new ApiError(400, "Please enter a valid email");
    }
    

    try{
        const preUser=await User.findOne({email: email});

        if(preUser){
            const OTP=Math.floor(10000 + Math.random() * 900000);
            const existEmail= await Otp.findOne({email:email})

            if(existEmail){
                const updateData=await Otp.findByIdAndUpdate({_id:existEmail._id},{
                    otp:OTP
                },{
                    new:true
                })

                await updateData.save()

                const mailOptions={
                    from :process.env.EMAIL,
                    to: email,
                    subject:"Sending email for otp validation",
                    text:`this is the required OTP:- ${OTP} ,if not required then please ignore`
                }

                transporter.sendMail(mailOptions,(error,info)=>{
                    if(error){
                        console.log("error",error)
                        res.status(400).json({
                            error: "email not sent"
                    })
                    }else{
                        console.log("email sent",info.response);
                        res.status(200).json({message: "email sent successfully"})
                    }
                })

            }else{
                const saveOtpData=new userOtp({
                    email,otp:OTP
                });
                await saveOtpData.save()

            const mailOptions={
                from :process.env.EMAIL,
                to: email,
                subject:"Sending email for otp validation",
                text:`this is the required OTP:- ${OTP} ,if not required then please ignore`
            }

            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.log("error",error)
                    res.status(400).json({
                        error: "email not sent"
                })
                }else{
                    console.log("email sent",info.response);
                    res.status(200).json({message: "email sent successfully"})
                }
            })
        }
        }else{
            res.status(400).json({error: "this User Not exist In our Db"})
        }
    }catch(error){
        res.status(400).json({error:"Invalid  Details",error})
    }
})



export {
    userOtp
}