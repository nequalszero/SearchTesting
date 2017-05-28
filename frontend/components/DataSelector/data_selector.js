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

  const listClassName = () => {
    return classNames({
      "data-selector-list": true,
      expanded: props.dropDownOpen
    });
  }

  const dropdownClassname = () => {
    return classNames({
      hidden: !props.dropDownOpen,
      dropdown: true
    });
  }

  return (
    <div className="data-selector">
      <p>Current Dataset: </p>
      <ul className={listClassName()}>
        <DataSelectorItem handleClick={props.toggleDropDown}
          dataKey={props.currentKey}
          className="current-selection"/>
        <ul className={dropdownClassname()}>
          {nonSelectedDataKeys().map((dataKey, idx) => (
            <DataSelectorItem key={idx}
              handleClick={() => props.handleSelection(dataKey)}
              dataKey={dataKey}/>
          ))}
        </ul>
      </ul>
    </div>
  )
}

DataSelector.propTypes = {
  dataKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSelection: PropTypes.func.isRequired,
  currentKey: PropTypes.string.isRequired
};

export default DataSelector;
