const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

const app = express();

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Anything that doesn't match the above, send back the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const PORT = process.env.PORT || 3000;
const API_PORT = 8000; // Adjust if your Flask runs on a different port

const app = express();

// Serve static files from React
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Proxy API requests to Flask
app.use('/api', createProxyMiddleware({ target: `http://localhost:${API_PORT}`, changeOrigin: true }));

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

