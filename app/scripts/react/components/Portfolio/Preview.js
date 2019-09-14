import React from 'react';

const Preview = ({preview}) => {
    return (
        <img className="portfolio__preview"
             src={preview}
             alt="website natours"/>
    )
};

export default Preview;