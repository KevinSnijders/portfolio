import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ icon, style }) => {
  const render = icon !== undefined ? icon.length : 0;
  if (!render > 0) {
    return null;
  }
  return (
    <svg data-test="IconComponent" className={`icon ${icon} ${style}`}>
      <use xlinkHref={`#.${icon}`}></use>
    </svg>
  );
};

export default Icon;

Icon.propTypes = {
  icon: PropTypes.string
};
