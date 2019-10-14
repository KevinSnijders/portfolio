import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ text, link, style, externUrl = false }) => {
  const render = link !== undefined && link !== null ? link.length : 0;
  if (!render > 0) {
    return null;
  }

  const buttonConfig = {
    target: '_blank',
    rel: 'noopener noreferrer'
  };

  const config = externUrl ? buttonConfig : '';

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
  externUrl: PropTypes.string,
  config: PropTypes.shape({
    target: PropTypes.string,
    rel: PropTypes.string
  })
};
