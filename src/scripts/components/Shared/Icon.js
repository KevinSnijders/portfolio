import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ prefix = 'icon-', icon, style = '' }) => {
  const render = icon !== undefined ? icon.length : 0;
  if (!render > 0) {
    return null;
  }
  return (
    <svg data-test="IconComponent" className={`icon ${prefix}${icon} ${style}`}>
      <use xlinkHref={`#.${icon}`}></use>
    </svg>
  );
};

export default Icon;

Icon.propTypes = {
  prefix: PropTypes.string,
  icon: PropTypes.string,
  style: PropTypes.string
};
