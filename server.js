const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

let phase = 0;
let gifPath = '';

// this is our Express application
const app = express();
app.session = null;

app.set('port', process.env.PORT || 3001);
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get('/start', (req, res) => {
  console.log('start');
  phase = 0;
  gifPath = '';
  // TODO start python script using subprocess
  setTimeout(function() {
    // recording started
    phase = 1;
    setTimeout(function() {
      // recording finished & processing started
      phase = 2;
      setTimeout(function() {
        // processing finished
        // TODO the final gif needs to be put in folder under "public/gifs"
        phase = 3;
        gifPath = path.join('gifs/test.gif');
      }, 4000);
    }, 4000);
  }, 1000);
  res.status(200).send();
});

app.get('/status', (req, res) => {
  console.log('status', JSON.stringify({ phase: phase, gifPath: gifPath }));
  // TODO send back either "recording", "processing" or "finished" with
  // json data containing the GIF data
  res.json({ phase: phase, gifPath: gifPath });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
