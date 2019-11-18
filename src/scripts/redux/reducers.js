import { types } from './types';

const initialStateTheme = 'light';
export const requestPortfolio = (state = [], action = {}) => {
  switch (action.type) {
    case types.GET_PORTFOLIO:
      return action.payload;
    default:
      return state;
  }
};

export const getNetworkStatus = (state = null, action = {}) => {
  switch (action.type) {
    case types.GET_NETWORK_STATUS:
      return action.payload;
    default:
      return state;
  }
};

export const getTheme = (state = initialStateTheme, action = {}) => {
  switch (action.type) {
    case types.GET_THEME:
      return action.payload;
    default:
      return state;
  }
};
