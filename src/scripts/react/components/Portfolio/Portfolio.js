import React from 'react';
import Item from './Item';
import PropTypes from 'prop-types';

const Portfolio = ({ portfolio, amountOfItems, itemsPerPage, loadMore }) => {
  if (!portfolio) {
    return null;
  }

  return (
    <div data-test="PortfolioComponent" className="portfolio">
      {portfolio.slice(0, itemsPerPage).map((portfolio, index) => {
        return <Item key={index} portfolio={portfolio} />;
      })}

      {amountOfItems > itemsPerPage && (
        <div className="portfolio__load-more d-flex justify-content-center p-5 fade-in">
          <button
            data-test="loadMoreButton"
            id="btn--load-more"
            onClick={loadMore}
            type="button"
            className="btn btn--dark btn--load-more"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
};

Portfolio.propTypes = {
  portfolio: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      demo: PropTypes.string,
      source: PropTypes.string,
      preview: PropTypes.string,
      resources: PropTypes.arrayOf(
        PropTypes.shape({
          projectid: PropTypes.number,
          name: PropTypes.string
        })
      )
    })
  ),
  amountOfItems: PropTypes.number,
  itemsPerPage: PropTypes.number,
  loadMore: PropTypes.func
};

export default Portfolio;
