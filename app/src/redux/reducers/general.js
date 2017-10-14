import { PHASES } from '../../constants';

export const initialState = {
  phase: PHASES.HOME,
  gifPath: ''
};

export default function generalReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_PHASE":
      return {
        ...state,
        phase: action.phase
      };

    case 'SET_GIF_PATH':
    return {
      ...state,
      gifPath: action.gifPath
    };

    default:
      return state;
  }
}
