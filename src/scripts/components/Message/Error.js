import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ errors }) => {
  return (
    <>
      {errors ? (
        <div className="form-group">
          <div className="alert alert-danger">
            <strong>Error!</strong> {errors.message || 'Something went wrong.'}
          </div>
        </div>
      ) : null}
    </>
  );
};

Error.propTypes = {
  errors: PropTypes.object
};

export default Error;
