import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import Home from '../Containers/Home';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Home></Home>
      </Provider>
    );
  }
}

export default hot(module)(App);
