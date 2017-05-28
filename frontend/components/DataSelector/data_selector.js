import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DataSelectorItem from './data_selector_item';

const DataSelector = (props) => {
  const nonSelectedDataKeys = () => {
    const selectedIndex = props.dataKeys.indexOf(props.currentKey);

    return [
      ...props.dataKeys.slice(0, selectedIndex),
      ...props.dataKeys.slice(selectedIndex + 1)
    ];
  }

  return (
    <div className="data-selector">
      <p>Current Dataset: </p>
      <select value={props.currentKey}
        onChange={(e) => {debugger; props.handleSelection(e.target.value)}}>
        <option value={true}>Yes</option>
        <option value={false}>No</option>
        {/* {nonSelectedDataKeys().map((dataKey, idx) => (
          <option key={dataKey}
            value={dataKey}>
            {dataKey}
          </option>
        ))} */}
      </select>
    </div>
  )
}

DataSelector.propTypes = {
  dataKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSelection: PropTypes.func.isRequired,
  currentKey: PropTypes.string.isRequired
};

export default DataSelector;
