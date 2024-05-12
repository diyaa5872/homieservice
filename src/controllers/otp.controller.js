import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import nodemailer from 'nodemailer';
import { User } from '../models/user.models.js';
import { Otp } from '../models/otp.models.js';

// Email configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

const userOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;
    console.log("Received email:", email);
 
    if (!email) {
        throw new ApiError(400, "Please enter a valid email");
    }
    
    try {
        const preUser = await User.findOne({ email: email });

        if (preUser) {
            const OTP = Math.floor(10000 + Math.random() * 900000);
            const existEmail = await Otp.findOne({ email: email });

            if (existEmail) {
                const updateData = await Otp.findByIdAndUpdate(existEmail._id, {
                    otp: OTP
                }, {
                    new: true
                });

                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Sending email for otp validation",
                    text: `This is the required OTP:- ${OTP}, if not required then please ignore`
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("Error:", error);
                        res.status(400).json({ error: "Email not sent" });
                    } else {
                        console.log("Email sent:", info.response);
                        res.status(200).json({ message: "Email sent successfully" });
                    }
                });
            } else {
                const saveOtpData = new Otp({
                    email,
                    otp: OTP
                });
                await saveOtpData.save();

                const mailOptions = {
                    from: process.env.EMAIL,
                    to: email,
                    subject: "Sending email for otp validation",
                    text: `This is the required OTP:- ${OTP}, if not required then please ignore`
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("Error:", error);
                        res.status(400).json({ error: "Email not sent" });
                    } else {
                        console.log("Email sent:", info.response);
                        res.status(200).json({ message: "Email sent successfully" });
                    }
                });
            }
        } else {
            res.status(400).json({ error: "This user does not exist in our database" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ error: "Invalid details", message: error.message || "An unexpected error occurred" });
    }
});

export {
    userOtp
};
