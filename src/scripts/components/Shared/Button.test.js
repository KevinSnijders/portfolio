import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';
import { findByTestAtrr, checkProps } from '../../utils/index';

const setUp = (props = {}) => {
  const component = shallow(<Button {...props} />);
  return component;
};

const configProps = {
  text: 'View more',
  link: '#more',
  style: 'btn--light',
  config: {
    target: '_blank'
  }
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

  describe('Button without props', () => {
    let component;
    beforeEach(() => {
      component = setUp();
    });
    it('Should NOT render without errors', () => {
      const button = findByTestAtrr(component, 'ButtonComponent');
      expect(button.length).toBe(0);
    });
  });
});
