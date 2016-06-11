const localtunnel = require('localtunnel');
const express = require('express');
const bodyParser = require('body-parser');

const PORT=8080; 

const intended_subdomain = process.env.SUBDOMAIN;

const secret_token = process.env.SECRET_TOKEN;

const exec = require('child_process').exec;

const tunnel = localtunnel(PORT, {subdomain: intended_subdomain}, (err, tunnel) => {
  if (err) {
    process.exit();
  }
  if (tunnel.url !== `https://${intended_subdomain}.localtunnel.me`) {
    console.error("Could not get the intended subdomain");
    process.exit();
  }


  var app = express();
  app.use(bodyParser.json()); // for parsing application/json
  app.listen(PORT, () => {
    console.log(`Server listening on: ${tunnel.url}`);
  });

  app.post('/', handleRequest);


});

tunnel.on('close', () => process.exit());



function handleRequest(req, res){
  if (req.body.token !== secret_token) {
    res.writeHead(403);
    return res.end();
  }
  exec(process.env.COMMAND_STRING, (error, stdout, stderr) => {
    if(error) {
      res.writeHead(500);
    }
    else {
      res.writeHead(200);
    }
    res.end();
  });
}





