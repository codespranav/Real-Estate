import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        required: true, 
        type: String, 
        unique: false
    }, 
    email: {
        required: true, 
        type: String, 
        unique: true 
    },
    password: {
        required: true, 
        type: String, 
        unique: false 
    },
    role: {
        type: Number,
        default: 1
    }
}, {timestamps: true})

const User = mongoose.model("User", UserSchema);
export default User;