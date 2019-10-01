import React from 'react';
import checkPropTypes from 'check-prop-types';
import { shallow } from 'enzyme';
import rerender from 'react-test-renderer';

export const findByHTML = (component, html) => {
  const wrapper = component.find(html);
  return wrapper;
};
export const findByTestAtrr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

export const checkProps = (component, expectedProps) => {
  const propsErr = checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
  return propsErr;
};

export const setUpComponent = (Component, props = {}, state = {}) => {
  const wrapper = shallow(<Component {...props} {...state} />);
  return wrapper;
};

// Test utils that are used basically in every test component
export const testComponentMatchSnapshot = (Compontent, props = {}, state = {}) => {
  const wrapper = rerender.create(<Compontent {...props} {...state} />);
  let tree = wrapper.toJSON();
  return expect(tree).toMatchSnapshot();
};

export const testComponentIsRendered = (component, attr, bool) => {
  const wrapper = findByTestAtrr(component, attr);
  let status = bool === true ? 1 : 0;
  return expect(wrapper.length).toBe(status);
};
