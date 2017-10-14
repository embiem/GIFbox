import React from 'react';
import { connect } from 'react-redux';
import Result from './Result';
import { generalActions } from '../../redux/actions';
import { PHASES } from '../../constants';

const ResultContainer = props => <Result {...props} />;

const mapStateToProps = state => {
  return {
    gifPath: state.general.gifPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFinishClick: () => dispatch(generalActions.setPhase(PHASES.HOME))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultContainer);
