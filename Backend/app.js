import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.js";
import shorturlRoutes from "./src/routes/shorturl.routes.js";
import { redirectUrl } from "./src/controllers/shorturl.controller.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://compact-url-chi.vercel.app"
  ]
}));
app.use(express.json());

app.use("/api/create", shorturlRoutes);

// Safer redirect route
app.get("/r/:id", redirectUrl);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});