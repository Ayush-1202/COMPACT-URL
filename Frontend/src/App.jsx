import React, { useState, useEffect } from "react";
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";
import api from "./api";
import "./App.css";

function App() {
  const [urls, setUrls] = useState([]);

  const addUrl = (shortUrlObj) => {
    setUrls([shortUrlObj]); // new URL at top
  };
    useEffect(() => {
    setUrls([]);
    }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>COMPACT-URL</h1>
        <UrlForm onAddUrl={addUrl} />
        <UrlList urls={urls} />
      </div>
    </div>
  );
}

export default App;
