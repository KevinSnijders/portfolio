import React, { Component } from 'react';
import Item from './Item';
import PropTypes from 'prop-types';

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPerPage: 1
    };
  }

  componentDidMount() {
    this.props.onFetchPortfolio();
  }

  loadMoreItems() {
    this.setState(prev => {
      return { itemsPerPage: prev.itemsPerPage + prev.itemsPerPage };
    });
  }

  render() {
    const { items } = this.props;
    const { itemsPerPage } = this.state;
    let currentLength = items !== undefined ? items.length : 0;

    if (currentLength === 0) {
      return null;
    }

    return (
      <section data-test="PortfolioComponent" className="portfolio container">
        {items.slice(0, itemsPerPage).map((item, index) => {
          return <Item key={index} item={item} />;
        })}

        {currentLength > itemsPerPage && (
          <div className="portfolio__load-more d-flex justify-content-center p-5 fade-in">
            <button
              data-test="loadMoreButton"
              id="btn--load-more"
              onClick={() => this.loadMoreItems()}
              type="button"
              className="btn btn--dark btn--load-more"
            >
              Load more
            </button>
          </div>
        )}
      </section>
    );
  }
}

export default Portfolio;

Portfolio.propTypes = {
  items: PropTypes.arrayOf(
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
  itemsPerPage: PropTypes.number,
  loadMoreItems: PropTypes.func,
  onFetchPortfolio: PropTypes.func
};
