const express = require('express'); // Import express module
const axios = require('axios'); // Import axios module for making HTTP requests
const cors = require('cors'); // Import cors module to enable Cross-Origin Resource Sharing

const app = express(); // Create an instance of express

app.use(cors()); // Enable CORS for your frontend

// Proxy endpoint to fetch EarthCam data
app.get('/api/cameras', async (req, res) => {
  const targetUrl = 'https://www.earthcam.com/network/'; // URL to fetch camera data from

  try {
    const response = await axios.get(targetUrl, {
      headers: {
        'User-Agent': 'YourApp/1.0 (contact@yourapp.com)', // Identify your scraper
      },
    });

    res.send(response.data); // Send raw HTML to the frontend
  } catch (error) {
    console.error('Proxy error:', error.message); // Log the error message to the console
    res.status(500).json({ error: 'Failed to fetch camera data' }); // Send error response to the frontend
  }
});

const PORT = 3001; // Define the port on which the server will run
app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`)); // Start the server and listen on the defined port
