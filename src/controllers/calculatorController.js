const { fetchNumbers } = require('../services/apiService');
const Cache = require('../utils/cache');

const cache = new Cache(10);

const getAverage = (numbers) => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return (sum / numbers.length).toFixed(2);
};

const handleRequest = async (req, res) => {
  try {
    const type = req.params.type;
    const numbers = await fetchNumbers(type);

    if (!numbers || !numbers.length) {
      return res.status(404).json({ error: 'No numbers found for the given type' });
    }

    cache.add(numbers);
    const prevState = cache.get().slice(0, -numbers.length);
    const currState = cache.get();
    const avg = getAverage(currState);

    res.json({
      windowPrevState: prevState,
      windowCurrState: currState,
      numbers,
      avg
    });
  } catch (error) {
    console.error('Error in handleRequest:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { handleRequest };