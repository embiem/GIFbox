import React from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

class Processing extends React.Component {
  static inval = null;
  componentDidMount() {
    Processing.inval = setInterval(this.props.checkProcessingStatus, 500);
    this.props.fetchLastGif();
  }

  componentWillUnmount() {
    clearInterval(Processing.inval);
  }

  render() {
    const { classes } = this.props;

    return (
      <Grid item>
        <Paper
          className={classes.root + ' animated lightSpeedIn entry-first'}
          elevation={4}
        >
          <Typography type="display1">
            Creating your GIF...
          </Typography>
        </Paper>
        {this.props.lastGifPath ? (
          <div>
            <Paper
              className={classes.root + ' animated bounceInUp entry-second'}
              elevation={4}
            >
              <Typography type="title">
                While you wait, check out the latest GIF:
              </Typography>
            </Paper>
            <img
              className="animated bounceInUp entry-third"
              src={this.props.lastGifPath}
              alt="Latest GIF"
            />
          </div>
        ) : null}
      </Grid>
    );
  }
}

export default withStyles(styles)(Processing);
