const express = require('express');
const autobahn = require('autobahn');
const bodyParser = require('body-parser');
const path = require('path');

// this is our Express application
var app = express();
app.session = null;

app.set('port', process.env.PORT || 3001);
app.use('/', express.static(path.join(__dirname, 'app/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});

// create a connection to WAMP router (Crossbar.io)
//
var connection = new autobahn.Connection({
  url: 'ws://localhost:8080/ws',
  realm: 'realm1'
});

connection.onopen = function(session) {
  console.log('connected to WAMP router');
  app.session = session;

  session.subscribe('com.gifbox.start', function(args) {
    console.log('com.gifbox.start', args);
    // TODO spawn the python-script here, which will start capturing, processing
  });
};

connection.onclose = function(reason, details) {
  console.log('WAMP connection closed', reason, details);
  app.session = null;
};

connection.open();
