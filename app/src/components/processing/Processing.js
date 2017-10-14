import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

import { getStatus } from '../../client';

class Processing extends React.Component {
  static inval = null;
  componentDidMount() {
    Processing.inval = setInterval(this.checkProcessingStatus, 500);
  }

  checkProcessingStatus = () => {
    getStatus().then(res => {
      if (res.phase > 2) {
        clearInterval(Processing.inval);
        this.props.onProcessingFinish(res.gifPath);
      }
    });
  }

  render() {
    return (
      <Grid item>
        <Typography type="display2" gutterBottom>
          Processing...
        </Typography>
      </Grid>
    );
  }
}

export default Processing;
