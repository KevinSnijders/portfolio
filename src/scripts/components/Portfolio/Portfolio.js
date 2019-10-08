import React, { Component } from 'react';
import Item from './Item';
import Load from '../Shared/Load';
import LoadingImage from '../../../assets/images/loading.png';
import NotFoundImage from '../../../assets/images/404.png';
import PropTypes from 'prop-types';

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsPerPage: 3
    };
  }

  componentDidMount() {
    this.props.onSetNetworkStatus();
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.hasNetworkConnection !== nextProps.hasNetworkConnection) {
      return true;
    }
    if (JSON.stringify(this.props.portfolioItems) !== JSON.stringify(nextProps.portfolioItems)) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps) {
    const { hasNetworkConnection } = this.props;
    if (prevProps.hasNetworkConnection !== hasNetworkConnection) {
      if (hasNetworkConnection) {
        this.props.onFetchPortfolio();
      }
    }
  }

  loadMoreItems() {
    this.setState(prev => {
      return { itemsPerPage: prev.itemsPerPage + prev.itemsPerPage };
    });
  }

  getAmountOfPortfolioItems(portfolioItems) {
    return portfolioItems === null || portfolioItems === undefined ? 0 : portfolioItems.length;
  }

  splitItems(items, itemsPerPage) {
    let firstItemIndex = 0;
    let lastItemIndex = itemsPerPage;
    return items.slice(firstItemIndex, lastItemIndex);
  }

  renderPageLoading(hasNetworkConnection, amountOfItems) {
    let htmlMarkUp;
    if (!hasNetworkConnection && amountOfItems === 0) {
      htmlMarkUp = <div>Items cant be loaded make sure you have internet connection</div>;
    } else if (hasNetworkConnection && amountOfItems === 0) {
      htmlMarkUp = <div>Loading</div>;
    }
    return <Load>{htmlMarkUp}</Load>;
  }
  renderItems(portfolioItems, itemsPerPage) {
    return this.splitItems(portfolioItems, itemsPerPage).map((item, index) => {
      return <Item key={index} item={item} position={index} />;
    });
  }

  renderLoadMoreButton() {
    return (
      <div className="portfolio__load-more d-flex justify-content-center p-5 fade-in">
        <a
          data-test="loadMoreButton"
          id="btn--load-more"
          onClick={() => this.loadMoreItems()}
          tabIndex="0"
          className="btn btn--load-more btn--big"
        >
          Load more work
        </a>
      </div>
    );
  }

  render() {
    let { portfolioItems, hasNetworkConnection } = this.props;
    const { itemsPerPage } = this.state;
    let amountOfItems = this.getAmountOfPortfolioItems(portfolioItems);
    let shouldShowLoadMoreButton = amountOfItems > itemsPerPage;

    if (amountOfItems === 0) {
      return hasNetworkConnection ? (
        <Load
          image={LoadingImage}
          alt="Loading items"
          style="scale-in-center"
          title="Loading!"
          message="The latest items are being loaded"
        />
      ) : (
        <Load
          image={NotFoundImage}
          alt="Not items found"
          style="scale-in-center"
          title="Whoops!"
          message="No items found. Check your connection or try reloading the page."
        />
      );
    }

    return (
      <section data-test="PortfolioComponent" className="portfolio">
        {this.renderItems(portfolioItems, itemsPerPage)}
        {shouldShowLoadMoreButton && this.renderLoadMoreButton()}
      </section>
    );
  }
}

export default Portfolio;

Portfolio.propTypes = {
  portfolioItems: PropTypes.arrayOf(
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
  hasNetworkConnection: PropTypes.bool,
  itemsPerPage: PropTypes.number,
  loadMoreItems: PropTypes.func,
  onFetchPortfolio: PropTypes.func,
  onSetNetworkStatus: PropTypes.func
};
