import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { saveState, loadState } from './localStorage';

//const initialState = {};

const middleware = [thunk];

const persistedState = loadState();
const store = createStore(
  rootReducer,
  persistedState,
  //initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(() => {
  saveState({
    journals: store.getState().journals,
  });
});

export default store;
