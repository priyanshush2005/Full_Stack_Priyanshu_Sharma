const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Path to log file
const logFilePath = path.join(__dirname, 'requests.log');

// Function to log requests
function logRequest(req) {
    const logEntry = `${new Date().toISOString()} | ${req.method} | ${req.url}\n`;

    // Append log (does not overwrite)
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        }
    });
}

// Create HTTP server
const server = http.createServer((req, res) => {

    // Log every request
    logRequest(req);

    // Routing
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to the Home Page');

    } else if (req.url === '/about' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('About Us Page');

    } else if (req.url === '/contact' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Contact Page');

    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
