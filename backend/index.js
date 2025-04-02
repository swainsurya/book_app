import express from "express";
import "dotenv/config";
import { connectDB } from "./api/utils/connectDB.js";
import userRouter from "./api/routes/user.routes.js";
import {bookRoutes} from "./api/routes/book.routes.js";

const app = express();
const port = process.env.PORT;

app.use(express.json())
// user Routers 
app.use("/api/auth",userRouter);

// book routes
app.use("/api/book",bookRoutes);

app.get("/",(req,res) => {
    res.send("Hello World");
})

connectDB()
.then(()=> {
    app.listen(port,()=>console.log(`Server is running on ${port}`))
})