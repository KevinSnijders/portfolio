import React from 'react';
import Item from './Item';

const Portfolio = ({itemsPerPage, portfolio}) => {
    return (
        <div className="portfolio">
            <Item portfolio={portfolio}/>
        </div>
    )
};

export default Portfolio;