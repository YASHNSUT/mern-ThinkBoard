import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import {connectDB} from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
dotenv.config();

//console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5001;
connectDB();

// middleware
app.use(cors({
    origin:"http://localhost:5173",
}));
app.use(express.json()); // this middleware will parse JSON bodies: req.body

app.use(rateLimiter);

// our custom simple middleware

// app.use((req, res, next) => {
//     console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
// })
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on PORT: ", PORT);
    });
});
