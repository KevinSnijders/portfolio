import React, {Component} from 'react';
import Details from './Details'
import Preview from './Preview';
import Resources from './Resources';

class Item extends Component {
    constructor(props) {
        super(props);
    }

    getEvenOrOddItem(i) {
        let number = 2;
        const col = "col-sm-auto col-md-6";
        const detailsLeft = `${col} col-lg-3 offset-lg-2 order-2 order-md-1 fade-in`;
        const previewRight = `${col} col-lg-5 order-1 order-md-2 fade-in-right`;
        const detailsRight = `${col} col-lg-3 fade-in`;
        const previewLeft = `${col} col-lg-5 offset-lg-2 fade-in-left`;

        return (i % number === 0) ?
            <>
                {this.renderComponent(<Details/>, detailsLeft)}
                {this.renderComponent(<Preview/>, previewRight)}
            </>
            :
            <>
                {this.renderComponent(<Preview/>, previewLeft)}
                {this.renderComponent(<Details/>, detailsRight)}
            </>
    };

    renderComponent(component, className) {
        return <div className={className}>
            {component}
        </div>
    }


    displayItems() {
        const {portfolio} = this.props;

        return (
            <>
                {(portfolio.length > 0) ? (
                        <>
                            {
                                portfolio.map((item, i) => {
                                    return (
                                        <div key={i} className="portfolio__item">
                                            <div className="row d-flex align-items-center">
                                                {this.getEvenOrOddItem(i)}
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </>
                    )
                    :
                    <div>Empty</div>
                }
            </>
        )
    };

    render() {
        return (
            this.displayItems()
        )
    }
}

export default Item;