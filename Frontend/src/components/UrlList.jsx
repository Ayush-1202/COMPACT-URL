import React from "react";

function UrlList({ urls }) {
  if (!urls.length) return null;

  const uniqueUrls = Array.from(
    new Map(urls.map((item) => [item.short_url, item])).values()
  );

  return (
    <div className="url-list">
      {uniqueUrls.map((urlObj) => (
        <div key={urlObj.short_url} className="url-box">
          
          <p className="label">Shortened URL</p>

          <div className="url-row">
            <a href={urlObj.shortUrl} target="_blank" rel="noreferrer">
              {urlObj.shortUrl}
            </a>

            <button onClick={() => navigator.clipboard.writeText(urlObj.short_url)}>
              Copy
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}

export default UrlList;