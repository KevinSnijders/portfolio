export const findByTestAtrr = (compontent, attr) => {
  const wrapper = compontent.find(`[data-test='${attr}']`);
  return wrapper;
};
