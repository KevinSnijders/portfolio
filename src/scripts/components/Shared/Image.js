import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ source, alt, style }) => {
  const render = source !== undefined ? source.length : 0;
  if (!render > 0) {
    return null;
  }
  return <img data-test="ImageComponent" className={style} src={source} alt={alt} />;
};

export default Image;

Image.propTypes = {
  source: PropTypes.string,
  alt: PropTypes.string,
  style: PropTypes.string
};
