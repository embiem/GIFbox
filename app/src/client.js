function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

function getUrl() {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return 'http://localhost:3001';
} else {
    return '';
}
}

export const startRecording = () =>
  fetch(getUrl() + '/start').then(checkStatus);

export const getStatus = () =>
  fetch(getUrl() + '/status', {
    headers: {
      Accept: 'application/json'
    }
  })
    .then(checkStatus)
    .then(parseJSON);
