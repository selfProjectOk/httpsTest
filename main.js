var express = require('express');
var app = express();

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync(__dirname + '/cer/' + 'private.pem', 'utf8');
var certificate = fs.readFileSync(__dirname + '/cer/' + 'file.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var PORT = 3004;
var SSLPORT = 3003;

httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});

app.use(express.static('dist',{
    setHeaders: function (res) {
        res.setHeader('Access-Control-Allow-Origin', '*')
    }
}));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/' + 'index.html');
})
app.get('/MobBS_v1.4.ipa', function (req, res) {
    res.sendFile(__dirname + '/dist/' + 'MobBS_v1.4.ipa');
})
app.get('/release.plist', function (req, res) {
    res.sendFile(__dirname + '/dist/' + 'release.plist');
})

