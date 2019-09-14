import React from 'react';

const Error = ({errors}) => {
    return (
        <>
            {(errors)
                ? (<div className="form-group">
                        <div className="alert alert-danger">
                            <strong>Error!</strong> {errors.message || 'Something went wrong.'}</div>
                    </div>
                )
                : null
            }
        </>
    )
};

export default Error;