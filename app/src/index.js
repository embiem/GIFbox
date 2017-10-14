import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import 'typeface-roboto';
import 'animate.css/animate.min.css';

import App from './App';

// Material UI setup
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

// Get material-ui theme & customize it
const customTheme = createMuiTheme({
  palette: {
    type: 'light'
  }
});

// redux setup
const store = require('./redux/configureStore').configure();


ReactDOM.render(
  <MuiThemeProvider theme={customTheme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
