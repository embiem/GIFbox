import React from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

class Recording extends React.Component {
  static inval = null;
  componentDidMount() {
    this.props.onStartRecording().then(() => {
      Recording.inval = setInterval(this.props.checkRecordingStatus, 500);
    });
  }

  componentWillUnmount() {
    clearInterval(Recording.inval);
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid item>
        <Paper
          className={classes.root + ' animated lightSpeedIn entry-first'}
          elevation={4}
        >
          <Typography type="display2">
            Start Recording...
          </Typography>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Recording);
