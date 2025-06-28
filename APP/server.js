
const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const axios = require('axios');
const { getCache, setCache } = require('./cache');
const { identifyPhoneNumber } = require('./services/phoneService');

const app = express();
app.use(cors());

const SHODAN_API_KEY = process.env.SHODAN_API_KEY || '';

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
      let browser;
      try {
        browser = await puppeteer.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.goto('https://www.earthcam.com/network/', {
          waitUntil: 'networkidle2',
        });
        const html = await page.content();
        return html;
      } finally {
        if (browser) {
          await browser.close();
        }
      }
    });
    res.send(data);
  } catch (error) {
    console.error('Puppeteer error:', error);
    res.status(500).json({ error: 'Failed to fetch cameras' });
  }
});



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


const WIGLE_USERNAME = process.env.WIGLE_USERNAME || '';
const WIGLE_PASSWORD = process.env.WIGLE_PASSWORD || '';

// Wigle API endpoint with caching
app.get('/api/wigle', async (req, res) => {
  try {
    const data = await fetchWithCache('wigle', async () => {
      const auth = Buffer.from(`${WIGLE_USERNAME}:${WIGLE_PASSWORD}`).toString('base64');
      const response = await axios.get('https://api.wigle.net/api/v2/network/search', {
        headers: { Authorization: `Basic ${auth}` },
        params: req.query,
      });
      return response.data.results || [];
    });
    res.json(data);
  } catch (error) {
    console.error('Wigle API error:', error);
    res.status(500).json({ error: 'Failed to fetch Wigle data' });
  }
});

// Phone ID endpoint
app.get('/api/phoneid', async (req, res) => {
  const number = req.query.number;
  if (!number) {
    return res.status(400).json({ error: 'Phone number is required' });
  }
  try {
    const result = await identifyPhoneNumber(number);
    res.json(result);
  } catch (error) {
    console.error('Phone ID error:', error);
    res.status(500).json({ error: 'Failed to identify phone number' });
  }
});

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));

module.exports = { app, server };

