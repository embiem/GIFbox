import React from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import { generalActions } from '../../redux/actions';
import { PHASES } from '../../constants';

const HomeContainer = props => <Home {...props} />;

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onStartClick: () => dispatch(generalActions.setPhase(PHASES.RECORDING))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
