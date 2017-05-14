import React from 'react';
import applicationData from '../../processed_data/results.js';
import ColorBar from './D3Test/color_bar';
import BarChart from './BarChart';

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

  changeDataSet = (idx) => {
    this.setState({currentKey: this.dataKeys[idx]});
  }

  selectDataSet(dataKey) {
    return this.dataMap[dataKey];
  }

  render() {
    return (
      <div className="app-container">
        <h1>This is the App file</h1>
        <button onClick={() => this.changeDataSet(0)}>Data Set 0</button>
        <button onClick={() => this.changeDataSet(1)}>Data Set 1</button>
        <br/>
        <div className="chart-container">

          <BarChart dataHash={this.selectDataSet(this.state.currentKey).benchmarks}
            queryKeys={this.queryKeys}
            currentKey={this.state.currentKey}/>
        </div>
      </div>
    );
  }
}

export default App;
