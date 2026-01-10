import React from "react";

function UrlList({ urls }) {
  if (!urls.length) return null;

  return (
    <div className="url-list">
      {urls.map((urlObj, index) => (
        <div key={index} className="url-item">
          <a href={urlObj.short_url} target="_blank" rel="noreferrer">
            {urlObj.short_url}
          </a>
          <button
            onClick={() => navigator.clipboard.writeText(urlObj.short_url)}
          >
            Copy
          </button>
        </div>
      ))}
    </div>
  );
}

export default UrlList;
