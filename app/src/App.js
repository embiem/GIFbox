import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

import './App.css';
import { PHASES, PHASE_NAMES } from './constants';
import AppBar from './components/appBar/AppBar';
import Home from './components/home';
import Recording from './components/recording';
import Processing from './components/processing';
import Result from './components/result';
import ErrorComponent from './components/error/Error';

import { generalActions } from './redux/actions';

const styles = theme => ({
  subheader: {
    marginLeft: theme.spacing.unit
  },
  contentGrid: {
    flexGrow: 1,
    marginTop: theme.spacing.unit,
    height: '100%',
    width: '100%'
  }
});

class App extends Component {
  // returns the appropriate component for the current state
  renderContent = () => {
    switch (this.props.phase) {
      case PHASES.HOME:
        return <Home />;
      case PHASES.RECORDING:
        return <Recording />;
      case PHASES.PROCESSING:
        return <Processing />;
      case PHASES.RESULT:
        return <Result />;
      default:
        return (
          <ErrorComponent
            message="Unknown phase!"
            onAckClick={() => this.props.setPhase(PHASES.HOME)}
          />
        );
    }
  };

  // return true if process indicator should be shown, otherwise return false
  shouldShowProgress = () => {
    if (
      this.props.phase === PHASES.RECORDING ||
      this.props.phase === PHASES.PROCESSING
    ) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <div className="App">
        <AppBar title="GIFBox">
          <Typography
            className={this.props.classes.subheader}
            type="title"
            color="secondary"
          >
            > {PHASE_NAMES[this.props.phase]}
          </Typography>
        </AppBar>
        {this.shouldShowProgress() ? <LinearProgress /> : null}
        <Grid
          className={this.props.classes.contentGrid}
          container
          direction="row"
          justify="center"
          align="center"
        >
          {this.renderContent()}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    phase: state.general.phase
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPhase: phase => dispatch(generalActions.setPhase(phase))
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(App)
);
