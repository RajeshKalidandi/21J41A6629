const axios = require('axios');

const fetchNumbers = async (type) => {
  const url = `http://localhost:9876/numbers/${type}`;
  try {
    const response = await axios.get(url, { timeout: 5000 });
    if (!response.data || !Array.isArray(response.data.numbers)) {
      throw new Error('Invalid response format');
    }
    return response.data.numbers;
  } catch (error) {
    console.error(`Error fetching ${type} numbers:`, error.message);
    return null;
  }
};

module.exports = { fetchNumbers };