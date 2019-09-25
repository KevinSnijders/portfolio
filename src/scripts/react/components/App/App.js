import React, { Component } from 'react';
import Portfolio from '../Portfolio/Portfolio';
import { connect } from 'react-redux';
import { fetchPortfolio } from '../../../redux/actions';
import PropTypes from 'prop-types';

const mapStateToProps = state => {
  return { items: state.requestPortfolio };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchPortfolio: () => dispatch(fetchPortfolio())
  };
};

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <Portfolio {...this.props} />
      </>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

App.propTypes = {
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
  )
};
