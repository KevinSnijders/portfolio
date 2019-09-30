import React from 'react';
import checkPropTypes from 'check-prop-types';
import { shallow } from 'enzyme';
import rerender from 'react-test-renderer';

export const findByTestAtrr = (compontent, attr) => {
  const wrapper = compontent.find(`[data-test='${attr}']`);
  return wrapper;
};

export const checkProps = (compontent, expectedProps) => {
  const propsErr = checkPropTypes(compontent.propTypes, expectedProps, 'props', compontent.name);
  return propsErr;
};

export const setUpComponent = (Component, props = {}) => {
  const wrapper = shallow(<Component {...props} />);
  return wrapper;
};

// Test utils that are used basically in every test component
export const testCompontentMatchSnapshot = (Compontent, props = {}) => {
  const wrapper = rerender.create(<Compontent {...props} />);
  let tree = wrapper.toJSON();
  return expect(tree).toMatchSnapshot();
};

export const testComponentIsRendered = (compontent, attr, bool) => {
  const wrapper = findByTestAtrr(compontent, attr);
  let status = bool === true ? 1 : 0;
  return expect(wrapper.length).toBe(status);
};
