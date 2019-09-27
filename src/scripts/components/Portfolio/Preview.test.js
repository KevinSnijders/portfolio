import React from 'react';
import { shallow } from 'enzyme';
import Preview from './Preview';
import { findByTestAtrr } from '../../utils/index';

const setUp = (props = {}) => {
  const component = shallow(<Preview {...props} />);
  return component;
};

describe('Preview Component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it('Should render without errros', () => {
    const logo = findByTestAtrr(component, 'logo');
    expect(logo.length).toBe(1);
  });
});
