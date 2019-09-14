import React from 'react';

const Details = () => {
    return (
        <>
            <h2 className="portfolio__title">
                Natours
            </h2>
            <p className="portfolio__details">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Aliquam consectetur cupiditate delectus incidunt labore laudantium molestias officiis
                quaerat repellendus, sequi.</p>
            <div className="portfolio__links">
                <button type="button" className="btn btn--primary mr-3">View demo

                </button>
                <button type="button" className="btn btn--secondary">View source code</button>
            </div>
        </>
    )
};

export default Details;