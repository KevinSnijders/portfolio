import React, { Component } from 'react';
import Item from './Item';

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPerPage: 4
    };
  }

  loadMore() {
    this.setState(prev => {
      return { itemsPerPage: prev.itemsPerPage + prev.itemsPerPage };
    });
  }

  render() {
    const { portfolio } = this.props;
    const { itemsPerPage } = this.state;

    return (
      <div className="portfolio">
        {portfolio.slice(0, itemsPerPage).map((portfolio, index) => {
          return (
            <Item
              key={index}
              length={portfolio.length}
              portfolio={portfolio}
            />
          );
        })}

        {portfolio.length > itemsPerPage && (
          <div className="portfolio__load-more d-flex justify-content-center p-5 fade-in">
            <button
              id="btn--load-more"
              onClick={() => this.loadMore()}
              type="button"
              className="btn btn--dark btn--load-more"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Portfolio;
