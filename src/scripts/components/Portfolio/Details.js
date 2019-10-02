import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Shared/Button';

const Details = ({ title, description, demo, source }) => {
  const buttonConfig = {
    target: '_blank',
    rel: 'noopener noreferrer'
  };
  return (
    <>
      <h2 className="portfolio__title">{title}</h2>
      <p className="portfolio__details">{description}</p>
      <div className="portfolio__links">
        <Button config={buttonConfig} link={demo} style="btn--primary mr-3" text="View Demo" />
        <Button link={source} style="btn--secondary" text="View source code" />
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
