import React from 'react';
import PropTypes from 'prop-types';

const Details = ({ title, description, demo, source }) => {
  return (
    <>
      <h2 className="portfolio__title">{title}</h2>
      <p className="portfolio__details">{description}</p>
      <div className="portfolio__links">
        <a href={demo} target="_blank" rel="noopener noreferrer" className="btn btn--primary mr-3">
          View demo
        </a>
        <a href={source} target="_blank" rel="noopener noreferrer" className="btn btn--secondary">
          View source code
        </a>
      </div>
    </>
  );
};

Details.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  demo: PropTypes.string,
  source: PropTypes.string
};

export default Details;
