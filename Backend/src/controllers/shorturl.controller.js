import ShortUrl from "../config/models/shorturl_model.js";
import { nanoid } from "nanoid";

export const createShortUrl = async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const shortCode = nanoid(7);
    const newUrl = new ShortUrl({ full_url: url, short_url: shortCode });
    await newUrl.save();
    res.json({ shortUrl: `${process.env.BASE_URL}/${shortCode}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllUrls = async (req, res) => {
  try {
    const urls = await ShortUrl.find().sort({ createdAt: -1 });
    res.json(
      urls.map(u => ({
        full_url: u.full_url,
        short_url: `${process.env.BASE_URL}/${u.short_url}`
      }))
    );
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const urlDoc = await ShortUrl.findOne({ short_url: id });
    if (!urlDoc) return res.status(404).json({ error: "Short URL not found" });
    urlDoc.clicks += 1;
    await urlDoc.save();
    res.redirect(urlDoc.full_url);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};
