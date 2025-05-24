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

4. Set up and run the proxy server (defaults to `http://localhost:3001`):
    ```sh
    PORT=3001 node server.js
    ```
    You can change the port by setting the `PORT` environment variable.

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
```

```bash
  node server.js
mkdir railway-proxy && cd railway-proxy
npm init -y
npm install express axios cors

```


#### Server.js

```markdown

Here is a `README.md` file for the `server.js` file in the `cam_scam` repository:

```markdown
# Cam Scam Proxy Server

This Node.js server acts as a proxy to fetch camera data from a third-party website using Puppeteer and serves it via an API endpoint. It is part of the Cam Scam project, which is an OSINT tool designed to scam LLMs and reverse engineer ways to extrapolate locations.

## Features

- Fetches HTML content from EarthCam's network page using Puppeteer.
- Serves the fetched HTML content via an API endpoint.
- Handles CORS to allow cross-origin requests.
- Runs in headless mode for performance and compatibility.

## Prerequisites

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/elithaxxor/cam_scam.git
    ```

2. Navigate to the project directory:
    ```sh
    cd cam_scam/APP
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the server:
    ```sh
    node server.js
    ```

2. The server will run on port **3001** by default. You can access the API endpoint at:
    ```
    http://localhost:3001/api/cameras
    ```

## API Endpoints

### GET /api/cameras

Fetches the HTML content from EarthCam's network page and returns it.

#### Response

- **200 OK**: Returns the HTML content of the EarthCam network page.
- **500 Internal Server Error**: Returns an error message if the fetch operation fails.

## Environment Variables


- `PORT`: (Optional) Port number on which the server will run. Defaults to **3001**.
=======

- `PORT`: (Optional) Port number on which the server will run. Defaults to 3001.

- `PORT`: (Optional) Port number on which the proxy server will run. Defaults to 3001.
- `REACT_APP_PROXY_URL`: URL used by the React app to fetch camera data. Defaults to `http://localhost:3001/api/cameras`.



## Code Overview

### `server.js`

This file sets up an Express server and uses Puppeteer to fetch HTML content from a third-party website. The fetched content is then served via the `/api/cameras` endpoint.

#### Key Functions:

- **Puppeteer Launch**: Launches a headless browser instance with specific arguments for compatibility.
- **Fetch and Serve HTML**: Navigates to the EarthCam network page, waits for the content to load, and sends the HTML as a response.
- **Error Handling**: Catches and logs any errors that occur during the fetch operation and ensures the browser is closed.

### Example Code:

```javascript
const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/cameras', async (req, res) => {
  let browser;
  try {
    // Launch Puppeteer (headless by default)
    browser = await puppeteer.launch({
      headless: true, // Run in headless mode (no GUI)
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Required for some environments
    });

    const page = await browser.newPage();
    await page.goto('https://www.earthcam.com/network/', {
      waitUntil: 'networkidle2', // Wait for dynamic content to load
    });

    const html = await page.content();
    res.send(html);
  } catch (error) {
    console.error('Puppeteer error:', error);
    res.status(500).json({ error: 'Failed to fetch cameras' });
  } finally {
    if (browser) await browser.close(); // Always close the browser
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
```
