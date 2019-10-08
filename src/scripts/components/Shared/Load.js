import React from 'react';
import Image from './Image';
import PropTypes from 'prop-types';

const Load = props => {
  const { image, alt, title, message, style, children } = props;
  return (
    <div className={`load fade-in-bottom`}>
      <Image style={`${style}`} source={image} alt={alt} />
      <h2>{title}</h2>
      <p>{message}</p>
      {children}
    </div>
  );
};

export default Load;

Load.propTypes = {
  image: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  style: PropTypes.string,
  children: PropTypes.any
};
