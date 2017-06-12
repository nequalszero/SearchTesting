import React from 'react';
import PropTypes from 'prop-types';

const Buttons = (props) => {

  return (
    <div className="buttons-container">
      <a className="github-link" target="_blank"
        href="https://github.com/nequalszero/SearchTesting">
        <i className="fa fa-github fa-lg"></i>View Source
      </a>
      <button className="open-schema" onClick={props.handleClick}>View Schema</button>
    </div>
  )
}

Buttons.propTypes = {
  handleClick: PropTypes.func.isRequired
};

export default Buttons;
