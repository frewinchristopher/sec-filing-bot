var http = require('http');
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser');

// bodyParser to get posts from $.ajax
app.use(bodyParser.json());

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// sec-filings-api endpoint (called by sec-filings path)
app.get('/sec-filings-api', function (req,res) {
  var oFilings = JSON.parse(fs.readFileSync('sec-filings.json', 'utf8'));
  res.send(JSON.stringify(oFilings)); // send json with all info
});

server = http.createServer(app);

// listening ports - reverse proxyed from nginx nlp-champs.com
server.listen(8084);