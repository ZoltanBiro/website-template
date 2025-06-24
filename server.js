// Dependencies
const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const router = express.Router();

const app = express();

// Certificate --- only if you have a cert lol
const privateKey = fs.readFileSync('C:/Certbot/live/zoltanbiro.ca/privkey.pem', 'utf8'); //path to the privkey.pem
const certificate = fs.readFileSync('C:/Certbot/live/zoltanbiro.ca/cert.pem', 'utf8'); //path to cert.pem
const ca = fs.readFileSync('C:/Certbot/live/zoltanbiro.ca/chain.pem', 'utf8'); //path to chain.pem

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};


app.use(express.json());
app.use(requireHTTPS);
app.use(express.static('.')); //static requests to get easy stuff

// ------ routes ------------
app.use('/about', aboutRoutes);  // Use the /about router
app.use('/users', usersRoutes);  // Use the /users router

// ------- get requests -------------------------------

app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html')
});

// ---- post requests -------------------------------

app.post('/addPrompt', function(req,res){
	fs.appendFile('./prompts.txt','\n'+req.body.value, (err)=>{
		if (err){
			console.log("error append word to file.");
		}else{
			console.log(req.body.value+" added to file");
		}
	});
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