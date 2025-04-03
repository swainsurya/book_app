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

router.get("/",checkAuth,async(req, res)=>{
    try {
        const page = req.query.page || 1;
        const limits = req.query.limit || 5;
        const skip = (page-1)*limits;

        const books = await booksModel.find().sort({createdAt: -1}).skip(skip).limit(limits).populate("user","username profileImage");

        const totalBooks = await booksModel.countDocuments();

        res.json({
            books,
            currentPage: page,
            totalBooks,
            totalPages: Math.ceil(totalBooks/limits)
        })
    } catch (error) {
        return res.status(501).json({
            message: "Internal Server Error"
        })
    }
})

router.delete("/del/:id",checkAuth,async(req, res)=>{
    try {
        const book = await booksModel.findById(req.params.id);
        if(!book){
            return res.status(404).json({
                message: "Book not found"
            })
        }
        // check user is owner of book or not 
        if(book.ownerId.toString() !== req.userId ) {
            return res.status(404).json({
                message: "Unauthorized User"
            })
        }
        await book.deleteOne();
    } catch (error) {
        return res.status(501).json({
            message: "Internal server error"
        })
    }
})

export default router;