import React from 'react';

const Resources = () => {
    return (
        <div className="portfolio__resources fade-in">
            <svg className="brand brand-html5">
                <use xlinkHref="#.brand-html5"></use>
            </svg>
            <svg className="brand brand-javascript">
                <use xlinkHref="#.brand-javascript"></use>
            </svg>
            <svg className="brand brand-sass">
                <use xlinkHref="#.brand-sass"></use>
            </svg>
            <svg className="brand brand-git">
                <use xlinkHref="#.brand-git"></use>
            </svg>
            <svg className="brand brand-node-dot-js">
                <use xlinkHref="#.brand-node-dot-js"></use>
            </svg>
        </div>
    )
};

export default Resources;