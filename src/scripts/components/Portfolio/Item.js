import React, { Component } from 'react';
import Details from './Detail';
import Image from '../Shared/Image';
import PropTypes from 'prop-types';

class Item extends Component {
  constructor(props) {
    super(props);
  }

  getEvenOrOddItem(item, position) {
    const col = 'col-md-6';
    const detailsLeft = `col ${col} col-lg-5 order-2 order-md-1 fade-in`;
    const previewRight = `col-sm-auto  ${col} col-lg-7 order-1 order-md-2 fade-in-right`;
    const detailsRight = `col ${col} col-lg-5 fade-in`;
    const previewLeft = `col-sm-auto ${col} col-lg-7 fade-in-left`;

    const { title, description, resources, demo, source, preview } = item;
    const currentPosition = this.calculateOddOrEven(position);
    const detailsCompontent = (
      <Details
        title={title}
        description={description}
        resources={resources}
        demo={demo}
        source={source}
        odd={currentPosition}
      />
    );
    const imageComponent = (
      <Image
        source={preview}
        alt={`Showcase example of the website called: ${title}`}
        style="portfolio__preview"
      />
    );
    return currentPosition ? (
      <>
        <div className={previewLeft}>{imageComponent}</div>
        <div className={detailsRight}>{detailsCompontent}</div>
      </>
    ) : (
      <>
        <div className={detailsLeft}>{detailsCompontent}</div>
        <div className={previewRight}>{imageComponent}</div>
      </>
    );
  }

  calculateOddOrEven(index) {
    const NUMBER = 2;
    return index % NUMBER === 0;
  }

  render() {
    const { item, position } = this.props;

    return (
      <>
        {Object.entries(item).length > 0 ? (
          <div className="portfolio__item">
            <div className="container">
              <div className="row d-flex align-items-center">
                {this.getEvenOrOddItem(item, position)}
              </div>
            </div>
          </div>
        ) : (
          <div>No projects found</div>
        )}
      </>
    );
  }
}

Item.propTypes = {
  item: PropTypes.object,
  position: PropTypes.number
};

export default Item;
