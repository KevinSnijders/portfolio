import React from 'react';
import { shallow } from 'enzyme';
import Preview from './Preview';
import { findByTestAtrr } from '../../../utils/index';

const setUp = (props = {}) => {
  const compontent = shallow(<Preview {...props} />);
  return compontent;
};

describe('Preview Compontent', () => {
  let compontent;
  beforeEach(() => {
    compontent = setUp();
  });

  it('Should render without errros', () => {
    const logo = findByTestAtrr(compontent, 'logo');
    expect(logo.length).toBe(1);
  });
});
