import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Shared/Icon';
const Resources = ({ resources }) => {
  return (
    <>
      {resources.map(({ name }, index) => {
        return <Icon key={index} prefix="brand" icon={name} />;
      })}
    </>
  );
};

Resources.propTypes = {
  resources: PropTypes.array
};

export default Resources;
