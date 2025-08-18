const express = require('express');
const path = require('path');

const app = express();

// Add CORS headers for better compatibility
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Serve static files from the parent directory
app.use(express.static(path.join(__dirname, '..')));

// Serve the main HTML file for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Export for Vercel
module.exports = app; 