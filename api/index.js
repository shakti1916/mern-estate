import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "../api/routes/user-route.js"
import authRouter from "../api/routes/auth-route.js"
import listingRouter from "../api/routes/listing-router.js"
import cookieParser from "cookie-parser";



dotenv.config()

const app = express();
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connected to mongo')
}).catch((err)=>{
    console.log(err)
})


app.listen(3000,()=>{
    console.log('Server listening on port 3000!!')

})

app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/listing",listingRouter)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})
