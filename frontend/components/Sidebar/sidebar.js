import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DonutChart from '../DonutChart';
import QueryGist from './query_gist';
import { round } from '../../lib/miscellaneous_functions';

class Sidebar extends React.Component {
  getPanelClass(panel) {
    return classNames({
      left: panel === 'benchmark',
      active: panel === this.props.activePanel,
      inactive: panel !== this.props.activePanel,
    })
  }

  // Message rendered if no data is selected on the bar chart.
  renderNoSelectionMessage() {
    switch(this.props.activePanel) {
      case 'benchmark':
        return <p className="no-selection">Click a bar on the chart to view a breakdown of the benchmark time.</p>;
      case 'gist':
        return <p className="no-selection">Click a bar on the chart to view the query details.</p>;
      default:
        throw `Error in Sidebar#renderNoSelectionMessage: unaccounted case '${this.props.activePanel}'`;
    }
  }

  buildDonutChart() {
    const donutDataKeys = Object.keys(this.props.benchmark)
    const donutDataObjects = [];

    donutDataKeys.forEach((key) => {
      if (typeof this.props.benchmark[key] == 'number') {
        donutDataObjects.push({ key, value: this.props.benchmark[key] });
      }
    })

    return (
      <DonutChart className="donut-chart-container"
        color={['#41B787', '#6352B9', '#B65480', '#D5735A']}
        data={donutDataObjects}
        displaySumInCenter={true}
        displayLegend={true}
        enable3D={true}
        formatLabel={(time) => `${round(time, 2)}s`}
        height={300}
        labelKey='key'
        labels={true}
        translateX={30}
        translateY={30}
        valueKey='value'
        width={300}/>
    );
  }

  render() {
    return (
      <div className="sidebar-container">
        <nav className="panels">
          <li className={this.getPanelClass('benchmark')}
            onClick={() => this.props.handlePanelSelect('benchmark')}>
            Benchmark
          </li>
          <li className={this.getPanelClass('gist')}
            onClick={() => this.props.handlePanelSelect('gist')}>
            View Query
          </li>
        </nav>
        { (this.props.activePanel === "benchmark") && this.props.benchmark && this.buildDonutChart() }
        { (this.props.activePanel === "gist") && this.props.queryGistId && <QueryGist queryGistId={this.props.queryGistId} /> }
        { !this.props.benchmark && !this.props.transitioning && this.renderNoSelectionMessage() }
      </div>
    );
  }
}

Sidebar.propTypes = {
  queryGistId: PropTypes.string,
  benchmark: PropTypes.object,
  activePanel: PropTypes.string.isRequired,
  handlePanelSelect: PropTypes.func.isRequired,
  transitioning: PropTypes.bool.isRequired
};

export default Sidebar;
