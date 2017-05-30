import React from 'react';
import PropTypes from 'prop-types';

const DataSelector = (props) => {
  return (
    <div className="data-selection-area">
      <h4>Current Dataset: </h4>

      <select value={props.currentKey}
        onChange={props.handleSelection}>
        {props.dataKeys.map((dataKey, idx) => (
          <option key={dataKey}
            value={dataKey}>
            {dataKey}
          </option>
        ))}
      </select>
    </div>
  );
}

DataSelector.propTypes = {
  dataKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSelection: PropTypes.func.isRequired,
  currentKey: PropTypes.string.isRequired
};

export default DataSelector;
