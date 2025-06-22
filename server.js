// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');

const app = express();

// Certificate
const privateKey = fs.readFileSync('C:/Certbot/live/zoltanbiro.ca/privkey.pem', 'utf8');
const certificate = fs.readFileSync('C:/Certbot/live/zoltanbiro.ca/cert.pem', 'utf8');
const ca = fs.readFileSync('C:/Certbot/live/zoltanbiro.ca/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};


app.use(requireHTTPS);

app.use((req, res) => {
	res.send('Hello there !');
});

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

function requireHTTPS(req,res,next){
    if(!req.secure) return res.status(307).redirect('https://'+req.get('host')+req.url);
    next();
}

httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});