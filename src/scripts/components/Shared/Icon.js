import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ prefix = 'icon', icon, style = '' }) => {
  const render = icon !== undefined ? icon.length : 0;
  const iconName = `${prefix}-${icon}`;
  if (!render > 0) {
    return null;
  }
  return (
    <svg data-test="IconComponent" className={`${prefix} ${iconName} ${style}`}>
      <use xlinkHref={`#${iconName}`}></use>
    </svg>
  );
};

export default Icon;

Icon.propTypes = {
  prefix: PropTypes.string,
  icon: PropTypes.string,
  style: PropTypes.string
};
