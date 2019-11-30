import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from '../Shared/Icon';

class Resource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  handleOnClick() {
    this.setState({
      isVisible: !this.state.isVisible
    });
  }
  renderListOfResources(resources, odd) {
    let badgeTheme = odd ? `portfolio__badge--even` : `portfolio__badge--odd`;
    return resources.map(({ name, display_name }, index) => {
      return (
        <div key={index} className={`portfolio__item--brand portfolio__badge ${badgeTheme}`}>
          <Icon prefix="brand" icon={name} />
          {display_name}
        </div>
      );
    });
  }
  render() {
    const { resources, odd } = this.props;
    const { isVisible } = this.state;

    if (resources.length === 0) {
      return null;
    }

    return (
      <div className="portfolio__technical">
        <div
          className={`portfolio__technical__header ${odd ? 'odd' : 'even'}`}
          onClick={() => this.handleOnClick()}
        >
          <h3>Technologies</h3>
          <Icon style={`${isVisible ? 'active' : ''}`} icon="keyboard_arrow_up" />
        </div>
        {isVisible ? (
          <div className="portfolio__brands fade-in-top">
            {this.renderListOfResources(resources, odd)}
          </div>
        ) : null}
      </div>
    );
  }
}

Resource.propTypes = {
  resources: PropTypes.array,
  odd: PropTypes.bool
};

export default Resource;
