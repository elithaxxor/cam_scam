const axios = require('axios');

const NUMVERIFY_API_KEY = process.env.NUMVERIFY_API_KEY || '';

async function identifyPhoneNumber(number) {
  if (!number) {
    throw new Error('Phone number is required');
  }

  if (!NUMVERIFY_API_KEY) {
    // Return placeholder data if no API key is configured
    return {
      number,
      country: 'Unknown',
      location: 'Unknown',
      carrier: 'Unknown',
      line_type: 'Unknown',
    };
  }

  const url = `http://apilayer.net/api/validate?access_key=${NUMVERIFY_API_KEY}&number=${encodeURIComponent(number)}`;
  const response = await axios.get(url);
  const data = response.data || {};

  return {
    number: data.international_format || number,
    country: data.country_name,
    location: data.location,
    carrier: data.carrier,
    line_type: data.line_type,
  };
}

module.exports = { identifyPhoneNumber };
