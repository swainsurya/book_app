import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profileImage: {type: String , default: ""}
}) 

export const userModel = mongoose.model("user",userSchema);