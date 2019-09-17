import React from 'react';
import PropTypes from 'prop-types';

const Details = ({ title, description, demo, source }) => {
  console.log(typeof title);
  return (
    <>
      <h2 className="portfolio__title">{title}</h2>
      <p className="portfolio__details">{description}</p>
      <div className="portfolio__links">
        <button type="button" className="btn btn--primary mr-3">
          View demo {demo}
        </button>
        <button type="button" className="btn btn--secondary">
          View source code {source}
        </button>
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
