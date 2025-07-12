const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Add CORS headers for better compatibility
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve the main HTML file for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Only start the server if we're not in a serverless environment
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`🎬 YouTube Video Looper is running!`);
        console.log(`📱 Open your browser and go to: http://localhost:${PORT}`);
        console.log(`🔄 Press Ctrl+C to stop the server`);
        console.log(`\n✨ Features:`);
        console.log(`   • Load any YouTube video by URL`);
        console.log(`   • Set precise loop start and end points`);
        console.log(`   • Track repetition count in real-time`);
        console.log(`   • Modern, responsive interface`);
        console.log(`   • Keyboard shortcuts (Spacebar, L key)`);
    });
}

// Export for Vercel
module.exports = app; 