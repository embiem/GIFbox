import React from 'react';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

const ErrorComponent = props => (
  <Grid item>
    <p>Sorry! An Error occured.</p>
    {props.message ? <p>{props.message}</p> : null}
    <Button raised color="primary" onClick={props.onAckClick}>
      RETRY
    </Button>
  </Grid>
);

export default ErrorComponent;
