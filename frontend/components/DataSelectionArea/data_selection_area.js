import React from 'react';
import PropTypes from 'prop-types';
import DataSelector from './DataSelector';
import Description from './Description';

const DataSelectionArea = (props) => {
  return (
    <div className="data-selection-container">
      <DataSelector currentKey={props.currentKey}
        dataKeys={props.dataKeys}
        handleSelection={(e) => props.handleSelection(e.target.value)}/>
      <Description />
    </div>
  );
}

DataSelectionArea.propTypes = {
  dataKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSelection: PropTypes.func.isRequired,
  currentKey: PropTypes.string.isRequired
};

export default DataSelectionArea;
