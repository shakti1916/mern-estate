import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "../api/routes/user-route.js"
import authRouter from "../api/routes/auth-route.js"



dotenv.config()

const app = express();
app.use(express.json())

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
