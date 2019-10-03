import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Shared/Icon';
const Resources = ({ resources }) => {
  return (
    <>
      {resources.map(({ name, display_name }, index) => {
        return (
          <div key={index} className="portfolio__item__resource">
            <Icon prefix="brand" icon={name} />
            <p>{display_name}</p>
          </div>
        );
      })}
    </>
  );
};

Resources.propTypes = {
  resources: PropTypes.array
};

export default Resources;
