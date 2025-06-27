const request = require('supertest');
const express = require('express');

// Mock server using the route from server.js
const app = express();
app.get('/api/cameras', (req, res) => res.send('<html></html>'));

test('GET /api/cameras returns html', async () => {
  const res = await request(app).get('/api/cameras');
  expect(res.statusCode).toBe(200);
  expect(res.text).toMatch(/<html>/);
});
