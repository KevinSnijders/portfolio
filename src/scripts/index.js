import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { requestPortfolio } from './redux/reducers';
import App from './components/App/App';

const rootReducer = combineReducers({ requestPortfolio });
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
