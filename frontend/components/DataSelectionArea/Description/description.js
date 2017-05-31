import React from 'react';
import PropTypes from 'prop-types';

const Description = (props) => {
  return (
    <div className="description-area">
      <h4>Description: </h4>
      <p>{props.description}</p>
    </div>
  )
}

Description.propTypes = {
  description: PropTypes.string.isRequired
};

export default Description;
