const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve the main HTML file for all routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

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