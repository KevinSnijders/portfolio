import checkPropTypes from 'check-prop-types';

export const findByTestAtrr = (compontent, attr) => {
  const wrapper = compontent.find(`[data-test='${attr}']`);
  return wrapper;
};

export const checkProps = (compontent, expectedProps) => {
  const propsErr = checkPropTypes(compontent.propTypes, expectedProps, 'props', compontent.name);
  return propsErr;
};
