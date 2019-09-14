import React from 'react';
import Details from './Details'
import Preview from './Preview';
import Resources from './Resources';

const Item = () => {
    return (
        <>
            <div className="row d-flex align-items-center">
                <div className="col-sm-auto col-md-6 col-lg-3 offset-lg-2 order-2 order-md-1 fade-in">
                    <Details/>
                </div>
                <div className="col-sm-auto col-md-6 col-lg-5 order-1 order-md-2 fade-in-right">
                    <Preview/>
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <Resources/>
            </div>
        </>
    )
};

export default Item;