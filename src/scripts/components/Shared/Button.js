import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, link, style, config = null }) => {
  const render = link !== undefined ? link.length : 0;
  if (!render > 0) {
    return null;
  }

  return (
    <a data-test="ButtonComponent" href={link} {...config} className={`btn ${style}`}>
      {text}
    </a>
  );
};

export default Button;

Button.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string,
  style: PropTypes.string,
  config: PropTypes.shape({
    target: PropTypes.string,
    rel: PropTypes.string
  })
};
