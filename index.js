import React, { useEffect, useState } from 'react';

const PublicCameras = () => {
    const [cameraLinks, setCameraLinks] = useState([]);

    useEffect(() => {
        const fetchCameras = async () => {
            // Use the proxy server to avoid CORS issues when fetching
            // EarthCam data directly from the browser.
            const url = "http://localhost:3001/api/cameras";

            try {
                const response = await fetch(url);
                const text = await response.text();

                // Parse the HTML content
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'text/html');

                // Find all camera links on the page
                const links = doc.querySelectorAll('a.cam_link');
                const urls = Array.from(links).map(link => link.href);

                // Update state with the camera URLs
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

