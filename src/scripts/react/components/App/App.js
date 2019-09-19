import React, { Component } from 'react';
import Error from '../Message/Error';
import Portfolio from '../Portfolio/Portfolio';
import Api from '../../../api/api';

const init = {
  portfolio: [],
  amountOfItems: null,
  itemsPerPage: 1,
  errors: null,
  apiUrl: 'https://kevin-portfolio-api.herokuapp.com'
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = init;
  }

  componentDidMount() {
    const { apiUrl } = this.state;
    Api.httpRequest(`${apiUrl}/portfolio`, 'get')
      .then(response => {
        response.map((item, index) => {
          this.setState({
            portfolio: [
              ...this.state.portfolio,
              {
                id: item.projectid,
                title: item.title,
                description: item.description,
                demo: item.demo,
                source: item.source,
                preview: item.preview,
                resources: item.resources
              }
            ],
            amountOfItems: index
          });
        });
      })
      .catch(error => {
        error.json().then(json => {
          this.setState({
            errors: json
          });
        });
      });
  }

  loadMore() {
    this.setState(prev => {
      return { itemsPerPage: prev.itemsPerPage + prev.itemsPerPage };
    });
  }

  render() {
    const { errors, itemsPerPage, portfolio, amountOfItems } = this.state;
    return (
      <>
        <Error errors={errors} />
        <Portfolio
          itemsPerPage={itemsPerPage}
          portfolio={portfolio}
          amountOfItems={amountOfItems}
          loadMore={this.loadMore}
        />
      </>
    );
  }
}

export default App;
