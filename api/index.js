import express from "express"
import mongoose from "mongoose";

const app = express();

mongoose.connect("mongodb+srv://shakti:shakti@cluster0.lgewaz0.mongodb.net/mern-estate")

app.listen(3000,()=>{
    console.log('Server listening on port 3000!!')

})