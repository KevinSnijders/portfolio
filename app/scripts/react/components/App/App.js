import React, {Component} from 'react';

const init = {

};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = init;
    }

    render() {
        return (
            <div>First React Element</div>
        )
    }
}

export default App;