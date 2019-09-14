import React, {Component} from 'react';
import Error from '../Message/Error';
import Portfolio from '../Portfolio/Portfolio';
import Api from '../../../api/api';

const init = {
    portfolio: [],
    itemsPerPage: 4,
    errors: null,
    apiUrl: 'http://localhost:8626'
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = init;
    }

    componentDidMount() {
        const {apiUrl} = this.state;
        Api.httpRequest(
            `${apiUrl}/portfolio`,
            'get'
        ).then((response) => {
            //console.log(response);
            response.map((item) => {
                this.setState({
                    portfolio: [
                        ...this.state.portfolio,
                        {
                            id: item.projectid,
                            title: item.title,
                            description: item.description,
                            demoUrl: item.demo,
                            gitSourceUrl: item.source,
                            preview: item.preview,
                            resources: item.resources
                        }]
                });
            });
        }).catch((error) => {
            error.json().then((json) => {
                this.setState({
                    errors: json
                })
            })
        })
    };

    render() {
        const {errors, itemsPerPage, portfolio} = this.state;
        return (
            <>
                <Error errors={errors} />
                <Portfolio itemsPerPage={itemsPerPage} portfolio={portfolio}/>
            </>
        )
    }
}

export default App;