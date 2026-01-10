import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/mongo.js";
import shorturlRoutes from "./src/routes/shorturl.routes.js";
import cors from "cors";

dotenv.config('./.env');
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/create", shorturlRoutes);

// Redirect root URL
app.get("/", (req, res) => res.send("URL Shortener API Running"));i

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(3000, () => {
    connectDB();
  console.log('Server is running on port 3000');
});