import React from 'react';
import { connect } from 'react-redux';
import Recording from './Recording';
import { generalActions } from '../../redux/actions';
import { PHASES } from '../../constants';
import { startRecording, getStatus } from '../../client';

const RecordingContainer = props => <Recording {...props} />;

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onStartRecording: startRecording,
    checkRecordingStatus: () => {
      getStatus().then(res => {
        if (res.phase > 1) {
          dispatch(generalActions.setPhase(PHASES.PROCESSING));
        }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordingContainer);
