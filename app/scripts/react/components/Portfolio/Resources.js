import React from 'react';

const Resources = ({resources}) => {
    return (
        <>
            {resources.map((resource, index) => {
                let {name} = resource;
                return (
                    <svg key={index} className={`brand brand-${name}`}>
                        <use xlinkHref={`#.brand-${name}`}></use>
                    </svg>
                )
            })
            }
        </>

    )
};

export default Resources;