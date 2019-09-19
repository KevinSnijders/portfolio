import React from 'react';
import { shallow } from 'enzyme';
import Portfolio from './Portfolio';

import { findByTestAtrr, checkProps } from '../../../utils/index';

const setUp = (props = {}) => {
  const compontent = shallow(<Portfolio {...props} />);
  return compontent;
};

describe('Portfolio Compontent', () => {
  describe('Check PropTypes', () => {
    it('Should not throw a warning', () => {
      const expectedProps = {
        portfolio: [
          {
            id: 1,
            title: 'Natours',
            description: 'description',
            demo: 'demo_url',
            source: 'source_url',
            preview: 'preview_url',
            resources: [
              {
                projectid: 1,
                name: 'Jest'
              }
            ]
          }
        ]
      };
      const propsErr = checkProps(Portfolio, expectedProps);
      expect(propsErr).toBeUndefined();
    });
  });

  describe('Have props', () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        portfolio: [
          {
            projectid: 1,
            title: 'Natours'
          },
          {
            projectid: 2,
            title: 'Trillo'
          }
        ],
        amountOfItems: 2,
        itemsPerPage: 1
      };

      wrapper = setUp(props);
    });

    it('Should render without errors', () => {
      const compontent = findByTestAtrr(wrapper, 'PortfolioComponent');
      expect(compontent.length).toBe(1);
    });

    it('Should render Load More Button', () => {
      const button = findByTestAtrr(wrapper, 'loadMoreButton');
      expect(button.length).toBe(1);
    });
  });

  describe('Have no props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setUp();
    });

    it('Should not render', () => {
      const compontent = findByTestAtrr(wrapper, 'PortfolioComponent');
      expect(compontent.length).toBe(0);
    });

    it('Should not render Load More Button', () => {
      const button = findByTestAtrr(wrapper, 'loadMoreButton');
      expect(button.length).toBe(0);
    });
  });
});
