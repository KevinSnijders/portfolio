import React from 'react';
import PropTypes from 'prop-types';

const Preview = ({ preview }) => {
  return <img className="portfolio__preview" src={preview} alt="website natours" />;
};

Preview.propTypes = {
  preview: PropTypes.string
};

export default Preview;
