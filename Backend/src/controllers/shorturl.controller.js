import ShortUrl from "../config/models/shorturl_model.js";
import { nanoid } from "nanoid";

export const createShortUrl = async (req, res) => {
  const { url, customCode } = req.body;

  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    // Validate URL
    let normalizedUrl;
    try {
      normalizedUrl = new URL(url).toString();
    } catch {
      return res.status(400).json({ error: "Invalid URL" });
    }

    // Check if already exists
    const existingUrl = await ShortUrl.findOne({ full_url: normalizedUrl });
    if (existingUrl) {
      return res.json({
        full_url: existingUrl.full_url,
        short_url: existingUrl.short_url,
        shortUrl: `${process.env.BASE_URL}/${existingUrl.short_url}`
        
      });
    }

    // Validate custom code
    if (customCode && !/^[a-zA-Z0-9_-]+$/.test(customCode)) {
      return res.status(400).json({ error: "Invalid custom code format" });
    }

    let shortCode = customCode;

    // If custom code provided
    if (shortCode) {
      const exists = await ShortUrl.findOne({ short_url: shortCode });
      if (exists) {
        return res.status(400).json({ error: "Custom URL already in use" });
      }
    } else {
      // Generate unique code
      let isUnique = false;
      let attempts = 0;

      while (!isUnique && attempts < 5) {
        shortCode = nanoid(7);
        const exists = await ShortUrl.findOne({ short_url: shortCode });
        if (!exists) isUnique = true;
        attempts++;
      }

      if (!isUnique) {
        return res.status(500).json({ error: "Failed to generate short URL" });
      }
    }

    const newUrl = new ShortUrl({
      full_url: normalizedUrl,
      short_url: shortCode
    });

    await newUrl.save();

    res.json({
      full_url: normalizedUrl,
      short_url: shortCode,
      shortUrl: `${process.env.BASE_URL}/${shortCode}`
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Short URL already exists" });
    }

    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { id } = req.params;

    const urlDoc = await ShortUrl.findOne({ short_url: id });
    if (!urlDoc) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    urlDoc.clicks += 1;
    await urlDoc.save();

    res.redirect(urlDoc.full_url);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};