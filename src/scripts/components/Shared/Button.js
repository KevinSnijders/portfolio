import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ name, link, style }) => {
  return (
    <a
      data-test="ButtonComponent"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn ${style}`}
    >
      {name}
    </a>
  );
};

export default Button;

Button.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  style: PropTypes.string
};
