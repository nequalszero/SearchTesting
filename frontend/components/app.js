import React from 'react';
import applicationData from '../../processed_data/results.js';
import ColorBar from './D3Test/color_bar';
import BarChart from './BarChart';
import DataSelectionArea from  './DataSelectionArea';

// Function that processes the applicationData, extracting nested data objects.
// Returns a dataKeys array and dataMap object that maps dataKeys to the data objects.
import { constructDataKeysAndDataMap } from '../lib/application_data_helper';

class App extends React.Component {
  constructor(props) {
    super(props);

    ({dataKeys: this.dataKeys, dataMap: this.dataMap} = constructDataKeysAndDataMap(applicationData));
    this.queryKeys = applicationData.query_keys;

    this.state = {
      currentKey: this.dataKeys[0]
    };
  }

  changeDataSet = (dataKey) => {
    this.setState({currentKey: dataKey});
  }

  selectDataSet(dataKey) {
    return this.dataMap[dataKey].benchmarks;
  }

  render() {
    return (
      <div className="app-container">
        <div className="chart-container">
          <DataSelectionArea handleSelection={(dataKey) => this.changeDataSet(dataKey)}
            dataKeys={this.dataKeys}
            currentKey={this.state.currentKey}/>
          <BarChart dataHash={this.selectDataSet(this.state.currentKey)}
            queryKeys={this.queryKeys}
            currentKey={this.state.currentKey}/>
        </div>
      </div>
    );
  }
}

export default App;
