const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for your frontend

// Proxy endpoint to fetch EarthCam data
app.get('/api/cameras', async (req, res) => {
  const targetUrl = 'https://www.earthcam.com/network/';

  try {
    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'YourApp/1.0 (contact@yourapp.com)', // Identify your scraper
      },
    });

    res.send(response.data); // Send raw HTML to the frontend
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ error: 'Failed to fetch camera data' });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));
