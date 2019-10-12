import React from 'react';
import PropTypes from 'prop-types';
import Resource from './Resource';
import Button from '../Shared/Button';

const Details = ({ title, description, resources, odd, demo, source }) => {
  const buttonConfig = {
    target: '_blank',
    rel: 'noopener noreferrer'
  };

  return (
    <>
      <h2 className="portfolio__title">{title}</h2>
      <p className="portfolio__details">{description}</p>
      <Resource resources={resources} odd={odd} />
      <div className="portfolio__links">
        <Button
          config={buttonConfig}
          link={demo}
          style="btn--primary btn--rounded mr-3"
          text="View Demo"
        />
        <Button
          config={buttonConfig}
          link={source}
          style="btn--secondary btn--rounded"
          text="View source code"
        />
      </div>
    </>
  );
};

Details.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  resources: PropTypes.array,
  odd: PropTypes.bool,
  demo: PropTypes.string,
  source: PropTypes.string
};

export default Details;
