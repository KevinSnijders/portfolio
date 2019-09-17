import React, { Component } from 'react';
import Error from '../Message/Error';
import Portfolio from '../Portfolio/Portfolio';
import Api from '../../../api/api';
import PropTypes from 'prop-types';

const init = {
  portfolio: [],
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
        // this.setState({
        //     portfolio: response
        // });
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
                resources: item.resources,
                index: index
              }
            ]
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

  render() {
    const { errors, itemsPerPage, portfolio } = this.state;
    return (
      <>
        <Error errors={errors} />
        <Portfolio itemsPerPage={itemsPerPage} portfolio={portfolio} />
      </>
    );
  }
}

App.propTypes = {
  portfolio: PropTypes.array
};

export default App;
