import React from 'react';

import applicationData from '../../processed_data/results.js';
import ColorBar from './D3Test/color_bar';
import DataSelectionArea from  './DataSelectionArea';
import BarChart from './BarChart';
import Sidebar from './Sidebar';
import SchemaGistModal from './SchemaGistModal';

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
      currentKey: this.dataKeys[0].stringForm,
      schemaGistOpen: false,
      barChart: {
        hoverKey: null
      },
      sidebar: {
        activePanel: 'benchmark',
        queryGistId: null,
        benchmark: null,
        queryKey: null,
        transitioning: false
      }
    };
  }

  changeDataSet = (dataKey) => {
    const queryKey = this.state.sidebar.queryKey;

    if (queryKey) {
      const benchmark = this.selectSidebarBenchmark(dataKey, queryKey);
      const sidebar = Object.assign({}, this.state.sidebar, {benchmark});
      this.setState({sidebar});
    }

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
      const sidebar = Object.assign({}, this.state.sidebar, {benchmark: null, queryGistId: null, transitioning: true});
      this.setState({sidebar});
    }
  }

  selectSidebarBenchmark(dataKey, queryKey) {
    return this.selectDataSet(dataKey)
               .benchmarks
               .find((bmObj) => bmObj.query_key === queryKey);
  }

  handleBarChartClick = (queryKey) => {
    let benchmark, queryGistId;

    if (this.state.sidebar.queryKey === queryKey) {
      queryKey = null;
      benchmark = null;
      queryGistId = null;
    } else {
      this.refreshQueryGist();
      benchmark = this.selectSidebarBenchmark(this.state.currentKey, queryKey);
      queryKey = benchmark.query_key;
      queryGistId = this.gistIds[queryKey];
    }


    const sidebar = { queryKey, queryGistId, benchmark, activePanel: this.state.sidebar.activePanel, transitioning: false };

    setTimeout(() => this.setState({sidebar}), 50);
  }

  handleBarChartMouseOver = (queryKey) => {
    this.setState({ barChart: { hoverKey: queryKey } });
  }

  handleBarChartMouseOut = () => {
    this.setState({ barChart: {hoverKey: null} });
  }

  render() {
    const benchmarks = this.selectDataSet(this.state.currentKey).benchmarks;
    const description = this.selectDataSet(this.state.currentKey).details.description;
    const chartProps = {
      currentKey: this.state.currentKey,
      dataHash: benchmarks,
      handlers: {
        handleBarClick: (queryKey) => this.handleBarChartClick(queryKey),
        handleBarMouseOver: (queryKey) => this.handleBarChartMouseOver(queryKey),
        handleBarMouseOut: () => this.handleBarChartMouseOut(),
        handleXTickClick: (queryKey) => this.handleBarChartClick(queryKey),
        handleXTickMouseOver: (queryKey) => this.handleBarChartMouseOver(queryKey),
        handleXTickMouseOut: () => this.handleBarChartMouseOut(),
      },
      hoverKey: this.state.barChart.hoverKey,
      queryKeys: this.queryKeys,
      selectedKey: this.state.sidebar.queryKey,
      translateX: 100,
      translateY: 70,
      xAxisLength: 450,
      yAxisLength: 300,
    };

    return (
      <div className="app-container">
        <div className="data-selector-and-chart-area">
          <DataSelectionArea handleSelection={(dataKey) => this.changeDataSet(dataKey)}
            dataKeys={this.dataKeys.map((dataKey) => dataKey.stringForm)}
            currentKey={this.state.currentKey}
            description={description}
            toggleSchemaGist={this.toggleSchemaGist}/>
          <div className="bar-chart-and-sidebar-container">
            <BarChart {...chartProps}/>
            <Sidebar {...this.state.sidebar}
              handlePanelSelect={(field) => this.selectSidebarPanel(field)}/>
          </div>
        </div>
        <SchemaGistModal onRequestClose={this.toggleSchemaGist}
          modalIsOpen={this.state.schemaGistOpen}
          gistId={this.gistIds.schema}/>
      </div>
    );
  }
}

export default App;
