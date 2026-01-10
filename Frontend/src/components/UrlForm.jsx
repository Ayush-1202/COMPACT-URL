import React, { useState } from "react";
import api from "../api";

function UrlForm({ onAddUrl }) {
  const [longUrl, setLongUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!longUrl) {
      setError("Please enter a URL.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/", { url: longUrl });
      const shortUrlObj = { short_url: res.data.shortUrl, full_url: longUrl };
      onAddUrl(shortUrlObj);
      setLongUrl("");
    } catch (err) {
      console.error(err);
      setError("Failed to create short URL");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="url-form">
      <input
        type="url"
        placeholder="Enter your URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Shortening..." : "Shorten"}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default UrlForm;
