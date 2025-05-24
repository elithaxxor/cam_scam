import React, { useEffect, useState } from 'react';

const PublicCameras = () => {
  const [cameraLinks, setCameraLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        // Fetch HTML via your proxy (not directly from EarthCam)
        const proxyUrl = process.env.REACT_APP_PROXY_URL || 'http://localhost:3001/api/cameras';
        const response = await fetch(proxyUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Extract camera links (same logic as before)
        const links = doc.querySelectorAll('a.cam_link');
        const urls = Array.from(links).map(link => link.href);

        setCameraLinks(urls);
        setError(null);
      } catch (error) {
        console.error('Fetch error:', error);
        setError('Failed to load cameras. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCameras();
  }, []);

  // Render states: loading, error, or success
  return (
    <div>
      <h1>Public Cameras</h1>
      {loading && <p>Loading cameras...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <ul>
          {cameraLinks.map((link, index) => (
            <li key={index}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PublicCameras;
