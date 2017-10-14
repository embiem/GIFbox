const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PythonShell = require('python-shell');
const uuidv4 = require('uuid/v4');
const fs = require('fs');

// data
let lastGifPath = '';
let phase = 0;
let gifPath = '';

// ensure the gifs directory exists
const gifsDir = path.join(__dirname, 'gifs');
if (!fs.existsSync(gifsDir)) {
  fs.mkdirSync(gifsDir);
}

// this is our Express application
const app = express();
app.session = null;

app.set('port', process.env.PORT || 3001);
app.use('/', express.static(path.join(__dirname, 'app', 'build')));
app.use('/gifs', express.static(gifsDir));
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

  // set initial values
  phase = 0;
  gifPath = '';

  // create the new directory
  const uid = uuidv4();
  const uuidDir = path.join(__dirname, 'gifs', uid);
  fs.mkdirSync(uuidDir);

  // start python script to create gif
  const pyShell = new PythonShell(
    'create_gif.py',
    // 'create_gif_mock.py',
    {
      args: [uuidDir, __dirname],
      mode: 'json'
    }
  );

  pyShell.stdout.on('data', data => {
    try {
      data = JSON.parse(data);
      if (data.phase) {
        console.log('phase ', data.phase);
        phase = data.phase;
      }
      if (data.durationRaw) {
        console.log(`Raw took ${data.durationRaw}s`);
      }
      if (data.durationFinal) {
        console.log(`Final took ${data.durationFinal}s`);
      }
    } catch (err) {
      console.error(err);
    }
  });

  pyShell.end(err => {
    if (err) throw err;

    // processing finished
    phase = 3;
    gifPath = 'gifs/' + uid + '/final.gif';
    lastGifPath = gifPath;
  });

  // send the OK for the "start" request
  res.status(200).send();
});

app.get('/status', (req, res) => {
  //console.log('status', JSON.stringify({ phase: phase, gifPath: gifPath }));
  // json data containing the GIF data
  res.json({ phase: phase, gifPath: gifPath });
});

app.get('/last', (req, res) => {
  console.log('/last');
  res.json({ lastGifPath });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
