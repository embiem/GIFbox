import React from 'react';
import { connect } from 'react-redux';
import Recording from './Recording';
import { generalActions } from '../../redux/actions';
import { PHASES } from '../../constants';

const RecordingContainer = props => <Recording {...props} />;

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onRecordingFinish: () => dispatch(generalActions.setPhase(PHASES.PROCESSING))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordingContainer);
