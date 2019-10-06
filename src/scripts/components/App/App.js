import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import Home from '../Containers/Home';
import PropTypes from 'prop-types';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Home></Home>
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.object
};

export default hot(module)(App);
