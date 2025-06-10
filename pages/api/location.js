// pages/api/location.js
import axios from 'axios';

export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  try {
    // Get user's country by IP
      const country = 'CA';  // hardcoded for testing


    // Define default currency per country
    const currencyMap = {
      US: 'USD',
      CA: 'CAD',
      DE: 'EUR',
      FR: 'EUR',
      // Add more countries and currencies as needed
    };

    const currency = currencyMap[country] || 'USD';

    // Fetch exchange rate
    const rateRes = await axios.get(`https://api.exchangerate.host/latest?base=USD&symbols=${currency}`);
    const rate = rateRes.data.rates[currency];

    res.status(200).json({ currency, rate });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching location or exchange rate' });
  }
}
