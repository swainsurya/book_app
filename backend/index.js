import express from "express";
import "dotenv/config";
import { connectDB } from "./api/utils/connectDB.js";

const app = express();
const port = process.env.PORT;

app.get("/",(req,res) => {
    res.send("Hello World");
})

connectDB()
.then(()=> {
    app.listen(port,()=>console.log(`Server is running on ${port}`))
})