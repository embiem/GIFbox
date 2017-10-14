const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const PythonShell = require('python-shell');
const uuidv4 = require('uuid/v4');
const fs = require('fs');

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

  // TODO do this using communication to python script
  phase = 1;

  // start python script to create gif
  const options = {
    args: [uuidDir, __dirname]
  };
  PythonShell.run(
    'create_gif.py' /*'create_gif_mock.py'*/,
    options,
    (err, results) => {
      if (err) throw err;
      if (results) console.log(results);

      // processing finished
      phase = 3;
      gifPath = 'gifs/' + uid + '/final.gif';
    }
  );

  // setTimeout(function() {
  //   // recording started
  //   phase = 1;
  //   setTimeout(function() {
  //     // recording finished & processing started
  //     phase = 2;
  //     setTimeout(function() {
  //       // processing finished
  //       // TODO the final gif needs to be put in folder under "public/gifs"
  //       phase = 3;
  //       gifPath = path.join('gifs/test.gif');
  //     }, 4000);
  //   }, 4000);
  // }, 1000);
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
