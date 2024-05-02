import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "../api/routes/user-route.js"


dotenv.config()

const app = express();

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('connected to mongo')
}).catch((err)=>{
    console.log(err)
})


app.listen(3000,()=>{
    console.log('Server listening on port 3000!!')

})

app.use("/api/user",userRouter)