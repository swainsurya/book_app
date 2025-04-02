import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    caption: {type: String, required: true},
    rating: {type: Number, required: true, default:0},
    image: {type: String, required: true},
    ownerId: {type:mongoose.Schema.Types.ObjectId, required: true, ref: "user"}
})

export const booksModel = mongoose.model("books",bookSchema);