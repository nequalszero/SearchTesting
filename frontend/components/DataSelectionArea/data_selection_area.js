import React from 'react';
import PropTypes from 'prop-types';
import DataSelector from './DataSelector';
import Description from './Description';

const DataSelectionArea = (props) => {
  return (
    <div className="data-selection-container">
      <div className="data-selector-schema-button-container">
        <DataSelector currentKey={props.currentKey}
          dataKeys={props.dataKeys}
          handleSelection={(e) => props.handleSelection(e.target.value)}/>
        <button className="open-schema" onClick={props.toggleSchemaGist}>View Schema</button>
      </div>
      <Description description={props.description}/>
    </div>
  );
}

DataSelectionArea.propTypes = {
  currentKey: PropTypes.string.isRequired,
  dataKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,
  handleSelection: PropTypes.func.isRequired,
  toggleSchemaGist: PropTypes.func.isRequired,
};

export default DataSelectionArea;
