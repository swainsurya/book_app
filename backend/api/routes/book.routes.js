import { checkAuth } from "../middlewares/getVerifiedUser.js";
import { booksModel } from "../models/books.model.js";
import express from "express";


const router = express.Router();

router.post("/create",checkAuth,async(req, res)=>{
    const {title, caption, rating, image} = req.body;
    if(!title || !caption || !rating || !image) {
        return res.status(400).json({
            message: "All fields are required",
            status: false
        })
    }
    try {
        const newBook = new booksModel({title,caption,rating,image,ownerId: req.userId});
        if(!newBook){
            return res.status(400).json({
                message: "Book not created",
                status: false
            })
        }
        await newBook.save();
        return res.status(200).json({
            message: "Book created Successfully",
            book: newBook,
            status: true
        })
    } catch (error) {
        
    }
})

export default router;