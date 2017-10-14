import React from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

class Home extends React.Component {
  render() {
    return (
      <Grid item>
        <Button
          raised
          color="primary"
          className="animated fadeInDown"
          onClick={this.props.onStartClick}
        >
          START
        </Button>
      </Grid>
    );
  }
}

export default Home;
