import mongoose from "mongoose";

export const connectDB =async() => {
    await mongoose.connect(process.env.MONGODB)
    .then((res)=>console.log("DB connected"))
    .catch(err => console.log("DB error "+err))
}