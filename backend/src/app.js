import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { Server } from "socket.io";
import http from "http"; // Import http module

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

const httpServer = http.createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("What is socket",socket.id);
    console.log("socket is active to be connected");

    socket.on("chat",(payload)=>{
        console.log("what is payload?",payload);
        io.emit("chat",payload);
    })
});

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.routes.js'
import workerRouter from './routes/worker.routes.js'
import reviewRouter from './routes/review.routes.js'
import otpRouter from './routes/otp.routes.js'
import requestRouter from './routes/workrequest.routes.js'
import bookingRouter from './routes/booking.routes.js'

//routes declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/workers",workerRouter)
app.use("/api/v1/reviews",reviewRouter)
app.use("/api/v1/otps",otpRouter)
app.use("/api/v1/requests",requestRouter)
app.use('/api/v1/bookings',bookingRouter)

// http://localhost:8000/api/v1/users/register

export { app }