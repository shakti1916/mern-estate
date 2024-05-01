import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";


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