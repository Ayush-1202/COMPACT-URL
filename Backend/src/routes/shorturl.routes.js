import express from "express";
import { createShortUrl, getAllUrls, redirectUrl } from "../controllers/shorturl.controller.js";

const router = express.Router();

router.post("/", createShortUrl);
router.get("/all", getAllUrls);
router.get("/:id", redirectUrl);

export default router;
