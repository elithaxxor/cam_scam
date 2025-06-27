
const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const axios = require('axios');
const { getCache, setCache } = require('./cache');
const { identifyPhoneNumber } = require('./services/phoneService');

const app = express();
app.use(cors());

const SHODAN_API_KEY = 'kXbnhyS8FUXZIm2ZNTHISmiYP8IHCUVD';
const WIGLE_API_KEY = 'kXbnhyS8FUXZIm2ZNTHISmiYP8IHCUVD';

// Cache TTL in seconds
const CACHE_TTL = 300;

async function fetchWithCache(key, fetchFunction) {
  const cached = getCache(key);
  if (cached) {
    return cached;
  }
  const data = await fetchFunction();
  setCache(key, data);
  return data;
}

// Existing EarthCam proxy endpoint with caching
app.get('/api/cameras', async (req, res) => {
  try {
    const data = await fetchWithCache('earthcam', async () => {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const page = await browser.newPage();
      await page.goto('https://www.earthcam.com/network/', {
        waitUntil: 'networkidle2',
      });
      const html = await page.content();
      await browser.close();
      return html;
    });
    res.send(data);
  } catch (error) {
    console.error('Puppeteer error:', error);
    res.status(500).json({ error: 'Failed to fetch cameras' });
  }
});




// Allow the port to be configured via the PORT environment variable.
// Default to 3001 so it matches the React app configuration.


// Allow configuring the port via the PORT environment variable.
// Default to 3001 so it matches the React component expectations.


// Allow the port to be configured via the PORT environment variable.
// Default to 3001 so it aligns with the React app configuration.



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));

// Shodan API endpoint with caching
app.get('/api/shodan', async (req, res) => {
  try {
    const data = await fetchWithCache('shodan', async () => {
      const shodanUrl = `https://api.shodan.io/shodan/host/search?key=${SHODAN_API_KEY}&query=camera`;
      const response = await axios.get(shodanUrl);
      return response.data.matches || [];
    });
    res.json(data);
  } catch (error) {
    console.error('Shodan API error:', error);
    res.status(500).json({ error: 'Failed to fetch Shodan data' });
  }
});

const basicAuth = require('basic-auth');

const WIGLE_USERNAME = 'kXbnhyS8FUXZIm2ZNTHISmiYP8IHCUVD'; // Assuming username is the key provided
const WIGLE_PASSWORD = 'kXbnhyS8FUXZIm2ZNTHISmiYP8IHCUVD'; // Assuming password is the same key for now

