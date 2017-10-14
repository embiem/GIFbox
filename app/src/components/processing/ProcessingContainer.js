import React from 'react';
import { connect } from 'react-redux';
import Processing from './Processing';
import { generalActions } from '../../redux/actions';
import { PHASES } from '../../constants';

const ProcessingContainer = props => <Processing {...props} />;

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    onProcessingFinish: gifPath => {
      dispatch(generalActions.setPhase(PHASES.RESULT));
      dispatch(generalActions.setGIFPath(gifPath));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ProcessingContainer
);
