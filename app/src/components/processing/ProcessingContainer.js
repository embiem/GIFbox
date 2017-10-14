import React from 'react';
import { connect } from 'react-redux';
import Processing from './Processing';
import { generalActions } from '../../redux/actions';
import { PHASES } from '../../constants';
import { getStatus, getLastGif, getUrl } from '../../client';

const ProcessingContainer = props => <Processing {...props} />;

const mapStateToProps = state => {
  return {
    lastGifPath: `${getUrl()}/${state.general.lastGifPath}`
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLastGif: () => {
      getLastGif().then(res => {
        if (res.lastGifPath) {
          dispatch(generalActions.setLastGifPath(res.lastGifPath));
        }
      })
    },
    checkProcessingStatus: () => {
      getStatus().then(res => {
        if (res.phase > 2) {
          dispatch(generalActions.setPhase(PHASES.RESULT));
          dispatch(generalActions.setGIFPath(res.gifPath));
        }
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ProcessingContainer
);
