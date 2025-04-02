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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
