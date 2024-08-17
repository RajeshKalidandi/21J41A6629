const express = require('express');
const { handleRequest } = require('./controllers/calculatorController');

const app = express();
const port = process.env.PORT || 9876;

app.get('/numbers/:type', handleRequest);

// Default route for undefined paths
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});