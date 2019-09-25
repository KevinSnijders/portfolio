import { types } from './types';
import Api from '../api/api';

export const fetchPortfolio = () => dispatch => {
  Api.httpRequest('https://kevin-portfolio-api.herokuapp.com/portfolio', 'get')
    .then(data => {
      dispatch({
        type: types.GET_PORTFOLIO,
        payload: data
      });
    })
    .catch(error => console.log(error));
};
