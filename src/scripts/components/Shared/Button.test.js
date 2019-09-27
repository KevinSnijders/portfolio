import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';
import { findByTestAtrr, checkProps } from '../../utils/index';

const setUp = (props = {}) => {
  const component = shallow(<Button {...props} />);
  return component;
};

const configProps = {
  name: 'View more',
  link: '#more',
  style: 'btn--light'
};

describe('Button compontent', () => {
  describe('Check PropTypes', () => {
    it('Should not throw a warning', () => {
      const expectedProps = configProps;

      const propErrs = checkProps(Button, expectedProps);
      expect(propErrs).toBeUndefined();
    });
  });

  describe('Button with props', () => {
    let component;
    beforeEach(() => {
      const props = configProps;
      component = setUp(props);
    });

    it('Should render without errors ', () => {
      const button = findByTestAtrr(component, 'ButtonComponent');
      expect(button.length).toBe(1);
    });
  });
});
