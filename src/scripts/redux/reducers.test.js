import { types } from './types';
import { requestPortfolio } from './reducers';

describe('Portfolio Reducer', () => {
  it('Should return default state', () => {
    const newState = requestPortfolio(undefined, {});
    expect(newState).toEqual([]);
  });

  it('Should return new state if receiving type', () => {
    const items = [{ title: 'Natours' }, { title: 'Trillo' }];
    const newState = requestPortfolio(undefined, {
      type: types.GET_PORTFOLIO,
      payload: items
    });

    expect(newState).toEqual(items);
  });
});
