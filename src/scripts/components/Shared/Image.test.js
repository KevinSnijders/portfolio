import React from 'react';
import { shallow } from 'enzyme';
import Image from './Image';
import { findByTestAtrr, checkProps } from '../../utils/index';

const setUp = (props = {}) => {
  const component = shallow(<Image {...props} />);
  return component;
};

const configProps = {
  source: 'https://urltoimage.nl/',
  alt: 'test image',
  style: 'image--round'
};

describe('Image Component', () => {
  describe('Check PropTypes', () => {
    const expectProps = configProps;
    const propsErr = checkProps(Image, expectProps);
    expect(propsErr).toBeUndefined();
  });
  describe('Check with props', () => {
    let component;
    beforeEach(() => {
      const props = configProps;
      component = setUp(props);
    });
    it('Should render without errors', () => {
      const image = findByTestAtrr(component, 'ImageComponent');
      expect(image.length).toBe(1);
    });
  });
  describe('Check without props', () => {
    let component;
    beforeEach(() => {
      component = setUp();
    });
    it('Should NOT render without errors', () => {
      console.log(component);
      const image = findByTestAtrr(component, 'ImageComponent');
      expect(image.length).toBe(0);
    });
  });
});
