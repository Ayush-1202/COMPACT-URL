import express from "express";
import { createShortUrl, redirectUrl } from "../controllers/shorturl.controller.js";

const router = express.Router();

router.post("/", createShortUrl);

export default router;
