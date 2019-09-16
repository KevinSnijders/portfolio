import React from 'react';

const Details = ({ title, description, demo, source }) => {
  return (
    <>
      <h2 className="portfolio__title">{title}</h2>
      <p className="portfolio__details">{description}</p>
      <div className="portfolio__links">
        <button type="button" className="btn btn--primary mr-3">
          View demo
        </button>
        <button type="button" className="btn btn--secondary">
          View source code
        </button>
      </div>
    </>
  );
};

export default Details;
