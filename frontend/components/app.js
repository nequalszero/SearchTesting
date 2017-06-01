import React from 'react';

import applicationData from '../../processed_data/results.js';
import ColorBar from './D3Test/color_bar';
import BarChart from './BarChart';
import Sidebar from './Sidebar';
import DataSelectionArea from  './DataSelectionArea';
import SchemaGist from './SchemaGist';

// Function that processes the applicationData, extracting nested data objects.
// Returns a dataKeys array and dataMap object that maps dataKeys to the data objects.
import { constructDataKeysAndDataMap } from '../lib/application_data_helper';

class App extends React.Component {
  constructor(props) {
    super(props);

    ({dataKeys: this.dataKeys, dataMap: this.dataMap} = constructDataKeysAndDataMap(applicationData));
    this.queryKeys = applicationData.query_keys;
    this.gistIds = applicationData.gist_ids;

    this.state = {
      currentKey: this.dataKeys[0],
      schemaGistOpen: false,
      sidebar: {
        activePanel: 'gist',
        queryGistId: null,
        benchmark: null,
        queryKey: null,
        transitioning: false
      }
    };
  }

  changeDataSet = (dataKey) => {
    this.setState({currentKey: dataKey});
  }

  selectDataSet(dataKey) {
    return this.dataMap[dataKey];
  }

  toggleSchemaGist = () => {
    this.setState({schemaGistOpen: !this.state.schemaGistOpen});
  }

  selectSidebarPanel = (field) => {
    const sidebar = Object.assign({}, this.state.sidebar);
    sidebar.activePanel = field;
    this.setState({sidebar});
  }

  refreshQueryGist() {
    if (this.state.sidebar.queryGistId) {
      console.log('refreshing query gist');
      const sidebar = Object.assign({}, this.state.sidebar, {benchmark: null, queryGistId: null, transitioning: true});
      this.setState({sidebar});
    }
  }

  handleBarClick = (queryKey) => {
    let benchmark, queryGistId;

    if (this.state.sidebar.queryKey === queryKey) {
      queryKey = null;
      benchmark = null;
      queryGistId = null;
    } else {
      this.refreshQueryGist();
      benchmark = this.selectDataSet(this.state.currentKey)
                      .benchmarks
                      .find((bmObj) => bmObj.query_key === queryKey);
      queryKey = benchmark.query_key;
      queryGistId = this.gistIds[queryKey];
    }


    const sidebar = { queryKey, queryGistId, benchmark, activePanel: this.state.sidebar.activePanel, transitioning: false };

    setTimeout(() => this.setState({sidebar}), 50);
  }

  render() {
    const benchmarks = this.selectDataSet(this.state.currentKey).benchmarks;
    const description = this.selectDataSet(this.state.currentKey).details.description;
    const chartProps = {
      xAxisLength: 450,
      yAxisLength: 300,
      translateX: 100,
      translateY: 70
    };

    return (
      <div className="app-container">
        <div className="data-selector-and-chart-area">
          <DataSelectionArea handleSelection={(dataKey) => this.changeDataSet(dataKey)}
            dataKeys={this.dataKeys}
            currentKey={this.state.currentKey}
            description={description}/>
          <div className="bar-chart-and-sidebar-container">
            <BarChart handleBarClick={(queryKey) => this.handleBarClick(queryKey)}
              dataHash={benchmarks}
              queryKeys={this.queryKeys}
              currentKey={this.state.currentKey}
              selectedBar={this.state.sidebar.queryKey}
              {...chartProps}/>
            <Sidebar {...this.state.sidebar}
              handlePanelSelect={(field) => this.selectSidebarPanel(field)}/>
          </div>
        </div>
        <SchemaGist handleClick={this.toggleSchemaGist}
          schemaGistOpen={this.state.schemaGistOpen}
          gistId={this.gistIds.schema}/>
      </div>
    );
  }
}

export default App;
