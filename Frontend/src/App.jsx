import React, { useState, useEffect } from "react";
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";
import api from "./api";
import "./App.css";

function App() {
  const [urls, setUrls] = useState([]);

  // Fetch all previously created URLs from backend
  const fetchUrls = async () => {
    try {
      const res = await api.get("/all"); // you need to implement GET /all in backend
      setUrls(res.data); 
    } catch (err) {
      console.error("Failed to fetch URLs:", err);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const addUrl = (shortUrlObj) => {
    setUrls([shortUrlObj, ...urls]); // new URL at top
  };

  return (
    <div className="container">
      <h1>URL Shortener</h1>
      <UrlForm onAddUrl={addUrl} />
      <UrlList urls={urls} />
    </div>
  );
}

export default App;
