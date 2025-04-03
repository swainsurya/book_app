import express from "express";
import "dotenv/config";
import { connectDB } from "./api/utils/connectDB.js";
import userRouter from "./api/routes/user.routes.js";
import bookRoutes from "./api/routes/book.routes.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

// ✅ Global CORS Configuration
app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

// Routes
app.use("/api/auth", userRouter);
app.use("/api/book", bookRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

// Connect to DB and Start Server
connectDB()
    .then(() => {
        app.listen(port, () => console.log(`🚀 Server is running on port ${port}`));
    })
    .catch((err) => {
        console.error("❌ Database connection failed:", err);
        process.exit(1);
    });