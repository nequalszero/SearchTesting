import React from 'react';
import PropTypes from 'prop-types';

const DataSelectorItem = (props) => {
  return (
    <li onClick={props.handleClick} className={`data-selector-item ${props.className || ""}`}>
      {props.dataKey}
    </li>
  )
}

DataSelectorItem.propTypes = {
  handleClick: PropTypes.func.isRequired,
  dataKey: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default DataSelectorItem;
