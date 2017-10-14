import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import { startRecording, getStatus } from '../../client';

class Recording extends React.Component {
  static inval = null;
  componentDidMount() {
    startRecording().then(res => {
      console.log(res);
      Recording.inval = setInterval(this.checkRecordingStatus, 500);
    });
  }

  checkRecordingStatus = () => {
    getStatus().then(res => {
      if (res.phase > 1) {
        clearInterval(Recording.inval);
        this.props.onRecordingFinish();
      }
    });
  }

  render() {
    return (
      <Grid item>
        <Typography type="display2" gutterBottom>
          Recording...
        </Typography>
      </Grid>
    );
  }
}

export default Recording;
