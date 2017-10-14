import * as redux from 'redux';
import thunk from 'redux-thunk';

// import reducers
import * as reducers from './reducers';

export const configure = (initialState = {}) => {
  // combine all reducers into a single one
  const reducer = redux.combineReducers({
    general: reducers.generalReducer
  });

  // use the combined reducer to create the store
  // also apply redux-thunk middleware and devToolsExtension
  const store = redux.createStore(
    reducer,
    initialState,
    redux.compose(
      redux.applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
};
