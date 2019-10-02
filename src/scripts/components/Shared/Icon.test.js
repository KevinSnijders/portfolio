import React from 'react';
import { shallow } from 'enzyme';
import Icon from './Icon';
import { findByTestAtrr, checkProps } from '../../utils/index';

const setUp = (props = {}) => {
  const component = shallow(<Icon {...props} />);
  return component;
};

const configProps = {
  icon: 'icon-github-brands'
};

describe('Icon Component', () => {
  describe('Check PropTypes', () => {
    it('Should not throw a warning ', () => {
      const expectedProps = configProps;
      const propsErrs = checkProps(Icon, expectedProps);
      expect(propsErrs).toBeUndefined();
    });
  });
  describe('Check with Props', () => {
    let component;
    beforeEach(() => {
      const props = configProps;
      component = setUp(props);
    });

    it('Should render without errors', () => {
      const icon = findByTestAtrr(component, 'IconComponent');
      expect(icon.length).toBe(1);
    });
  });

  describe('Check without Props', () => {
    let component;
    beforeEach(() => {
      component = setUp();
    });
    it('Should NOT render without Errors', () => {
      const icon = findByTestAtrr(component, 'IconComponent');
      expect(icon.length).toBe(0);
    });
  });
});
