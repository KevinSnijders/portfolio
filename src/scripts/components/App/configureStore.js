import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { requestPortfolio, getNetworkStatus, getTheme } from '../../redux/reducers';

export default function buildStore() {
  const rootReducer = combineReducers({ requestPortfolio, getNetworkStatus, getTheme });
  const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

  if (module.hot) {
    module.hot.accept('../../redux/reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}
