import React from 'react';
import applicationData from '../../processed_data/results.js';
import ColorBar from './D3Test/color_bar';
import BarChart from './BarChart/bar_chart';

class App extends React.Component {
  constructor(props) {
    super(props);
    const dataKeys = Object.keys(applicationData.data);

    this.state = {
      queryKeys: applicationData.query_keys,
      data: applicationData.data,
      currentKey: dataKeys[0],
      dataKeys
    };
  }

  changeDataSet = (idx) => {
    this.setState({currentKey: this.state.dataKeys[idx]})
  }

  render() {
    return (
      <div className="app-container">
        <h1>This is the App file</h1>
        {/* <svg id="svg">
          <ColorBar width="400"/>
        </svg> */}
        <button onClick={() => this.changeDataSet(0)}>Data Set 0</button>
        <button onClick={() => this.changeDataSet(1)}>Data Set 1</button>
        <br/>
        <BarChart dataHash={this.state.data[this.state.currentKey].benchmarks}
          queryKeys={this.state.queryKeys}/>
      </div>
    );
  }
}

export default App;
