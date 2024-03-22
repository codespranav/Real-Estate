import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();
export const connectToDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to Database");
    } catch (error) {
        console.log(error);
    }
}