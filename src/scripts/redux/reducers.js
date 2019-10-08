import { types } from './types';

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
