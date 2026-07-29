import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import chatRoutes from "./routes/chatRoutes.js";
import { validateMIMOEModel } from "./services/mimOEService.js";


const app = express();
const isProduction = process.env.NODE_ENV === "production";

try {
    await validateMIMOEModel();
} catch (error) {
    if (isProduction) {
        console.error("mimOE model validation failed:", error.message);
        process.exit(1);
    }
    console.warn("mimOE model unavailable:", error.message);
    console.warn(
        "Continuing startup in development mode. /api/chat may fail until mimOE has a deployed model."
    );
}

connectDB();

const corsOptions = {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());


app.get("/",(req,res)=>{
    res.json({
        message:"mimOE AI Agent API running"
    });
});


app.use(
    "/api/chat",
    chatRoutes
);



const PORT=process.env.PORT || 5050;

const server = app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});

server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use. Please stop the process using it or change PORT in backend/.env.`);
    } else {
        console.error("Server error:", error);
    }
    process.exit(1);
});