import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import buildStore from './components/App/configureStore';

import App from './components/App/App';
import * as serviceWorker from './serviceWorker';

const store = buildStore();

const renderComponent = Component => {
  render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    document.getElementById('react')
  );
};

renderComponent(App);

if (module.hot) {
  module.hot.accept('./components/App/App', () => {
    renderComponent(App);
  });
}

serviceWorker.register();
