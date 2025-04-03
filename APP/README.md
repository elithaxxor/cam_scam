#### PublicCamera.js

```markdown
# Cam Scam

Cam Scam is a unique OSINT tool designed to scam LLMs and reverse engineer ways to extrapolate locations. It provides a cool and unique way to access and display public camera feeds.

## Features

- Fetches and displays public camera links.
- Handles loading and error states gracefully.
- Uses a proxy server to fetch camera data securely.

## Technology Stack

- **JavaScript**: 47.4%
- **PHP**: 52.6%
- React

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/elithaxxor/cam_scam.git
    ```

2. Navigate to the project directory:
    ```sh
    cd cam_scam
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

4. Set up and run the proxy server (make sure the proxy server is running on `http://localhost:3001`):
    ```sh
    # Example for starting a simple proxy server
    npm run start-proxy
    ```

5. Start the React application:
    ```sh
    npm start
    ```

## Usage

The main component for displaying public cameras is `PublicCameras.js`. It fetches camera links from a proxy server and displays them in a list.

### `PublicCameras.js`

This component is responsible for fetching and displaying public camera links. It uses the `useEffect` hook to fetch the data when the component mounts. The fetched HTML is parsed to extract camera links, which are then displayed in a list.

#### Key Functions:

- **fetchCameras**: Asynchronously fetches camera data via a proxy server and parses the HTML to extract camera links.
- **useState**: Manages the state for camera links, loading, and error messages.
- **useEffect**: Fetches camera data when the component mounts.

#### Example Code:

```javascript
import React, { useEffect, useState } from 'react';

const PublicCameras = () => {
  const [cameraLinks, setCameraLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        // Fetch HTML via your proxy (not directly from EarthCam)
        const proxyUrl = 'http://localhost:3001/api/cameras';
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

```bash
  node server.js
mkdir railway-proxy && cd railway-proxy
npm init -y
npm install express axios cors

```
