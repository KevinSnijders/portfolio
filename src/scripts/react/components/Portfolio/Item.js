import React, { Component } from 'react';
import Details from './Details';
import Preview from './Preview';
import Resources from './Resources';
import PropTypes from 'prop-types';

class Item extends Component {
  constructor(props) {
    super(props);
  }

  getEvenOrOddItem(data) {
    let number = 2;
    const col = 'col-sm-auto col-md-6';
    const detailsLeft = `${col} col-lg-3 offset-lg-2 order-2 order-md-1 fade-in`;
    const previewRight = `${col} col-lg-5 order-1 order-md-2 fade-in-right`;
    const detailsRight = `${col} col-lg-3 fade-in`;
    const previewLeft = `${col} col-lg-5 offset-lg-2 fade-in-left`;

    let { index, title, description, demo, source, preview } = data;

    return index % number === 0 ? (
      <>
        {this.renderComponent(
          <Details title={title} description={description} demo={demo} source={source} />,
          detailsLeft
        )}
        {this.renderComponent(<Preview preview={preview} />, previewRight)}
      </>
    ) : (
      <>
        {this.renderComponent(<Preview preview={preview} />, previewLeft)}
        {this.renderComponent(
          <Details title={title} description={description} demo={demo} source={source} />,
          detailsRight
        )}
      </>
    );
  }

  renderComponent(component, className) {
    return <div className={className}>{component}</div>;
  }

  displayItems() {
    const { portfolio } = this.props;
    return (
      <>
        {Object.entries(portfolio).length > 0 ? (
          <div className="portfolio__item">
            <div className="row d-flex align-items-center">{this.getEvenOrOddItem(portfolio)}</div>
            <div className="row d-flex justify-content-center">
              <Resources resources={portfolio.resources} />
            </div>
          </div>
        ) : (
          <div>Empty</div>
        )}
      </>
    );
  }

  render() {
    return this.displayItems();
  }
}

Item.propTypes = {
  portfolio: PropTypes.object
};

export default Item;
