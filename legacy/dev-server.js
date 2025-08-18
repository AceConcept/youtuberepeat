const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = path.extname(filePath);
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found, serve index.html for SPA routing
                fs.readFile('./index.html', (err, content) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Error loading index.html');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    }
                });
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`🎬 YouTube Video Looper is running!`);
    console.log(`📱 Open your browser and go to: http://localhost:${PORT}`);
    console.log(`🔄 Press Ctrl+C to stop the server`);
    console.log(`\n✨ Features:`);
    console.log(`   • Load any YouTube video by URL`);
    console.log(`   • Set precise loop start and end points`);
    console.log(`   • Track repetition count in real-time`);
    console.log(`   • Modern, responsive interface`);
    console.log(`   • Keyboard shortcuts (Spacebar, L key)`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`❌ Port ${PORT} is already in use.`);
        console.log(`💡 Try these solutions:`);
        console.log(`   1. Kill the process using port ${PORT}:`);
        console.log(`      Windows: netstat -ano | findstr :${PORT}`);
        console.log(`      Mac/Linux: lsof -i :${PORT}`);
        console.log(`   2. Or use a different port: PORT=3002 npm run dev`);
        console.log(`   3. Or restart your terminal/command prompt`);
    } else {
        console.error('Server error:', err);
    }
    process.exit(1);
}); 