import { types } from './types';
import Api from '../api/api';

export const fetchPortfolio = () => dispatch => {
  Api.httpRequest('https://kevin-portfolio-api.herokuapp.com/portfolio', 'get')
    .then(data => {
      dispatch({
        type: types.GET_PORTFOLIO,
        payload: data
      });
      localStorage.setItem('items', JSON.stringify(data));
    })
    .catch(error => console.log(error));
};

export const setNetworkStatus = () => dispatch => {
  dispatch({
    type: types.GET_NETWORK_STATUS,
    payload: navigator.onLine ? true : false
  });
};

export const setTheme = theme => ({
  type: types.GET_THEME,
  payload: theme
});
