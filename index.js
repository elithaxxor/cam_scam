import React, { useEffect, useState } from 'react';

const PublicCameras = () => {
  const [cameraLinks, setCameraLinks] = useState([]);

  useEffect(() => {
    const fetchCameras = async () => {
      const proxyUrl = process.env.REACT_APP_PROXY_URL || 'http://localhost:3001/api/cameras';
      try {
        const response = await fetch(proxyUrl);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const links = doc.querySelectorAll('a.cam_link');
        const urls = Array.from(links).map(link => link.href);
        setCameraLinks(urls);
      } catch (error) {
        console.error('Error fetching or parsing the page:', error);
      }
    };

    fetchCameras();
  }, []);

  return (
    <div>
      <h1>Public Cameras</h1>
      <ul>
        {cameraLinks.map((link, index) => (
          <li key={index}>
            <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PublicCameras;
