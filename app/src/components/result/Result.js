import React from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

class Result extends React.Component {
  render() {
    return (
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <img src={this.props.gifPath} alt="Final GIF" />
          </Grid>
          <Grid item>
            <Button raised color="primary" onClick={this.props.onFinishClick}>
              FINISH
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Result;
