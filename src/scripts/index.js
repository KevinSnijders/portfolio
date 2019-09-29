import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './components/App/App';
import buildStore from './components/App/configureStore';

const store = buildStore();

const renderComponent = Component => {
  render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    document.getElementById('root')
  );
};

renderComponent(App);

if (module.hot) {
  module.hot.accept('./components/App/App', () => {
    renderComponent(App);
  });
}
