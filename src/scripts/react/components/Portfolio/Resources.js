import React from 'react';
import PropTypes from 'prop-types';

const Resources = ({ resources }) => {
  return (
    <>
      {resources.map((resource, index) => {
        let { name } = resource;
        return (
          <svg key={index} className={`brand brand-${name}`}>
            <use xlinkHref={`#.brand-${name}`}></use>
          </svg>
        );
      })}
    </>
  );
};

Resources.propTypes = {
  resources: PropTypes.array
};

export default Resources;
