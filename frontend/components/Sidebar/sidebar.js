import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import DonutChart from '../DonutChart';
import QueryGist from './query_gist';

class Sidebar extends React.Component {
  // Necessary to make the embedded gists show up after rendering.
  componentDidUpdate() {
    $('[data-gist-id]').gist();
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
      <DonutChart color={['#41B787', '#6352B9', '#B65480', '#D5735A']}
        id="pie-chart-container"
        width={300}
        height={300}
        data={donutDataObjects}
        point='value'
        enable3d={false}/>
    );
  }

  render() {
    return (
      <div className="sidebar-container">
        <nav className="panels">
          <li className="left" onClick={() => this.props.handlePanelSelect('benchmark')}>Benchmark</li>
          <li className="right" onClick={() => this.props.handlePanelSelect('gist')}>View Query</li>
        </nav>
        { (this.props.activePanel === "benchmark") && this.props.benchmark && this.buildDonutChart() }
        { (this.props.activePanel === "gist") && this.props.queryGistId && <QueryGist queryGistId={this.props.queryGistId} /> }
        { !this.props.benchmark && !this.props.transitioning && <p>Click a bar on the chart to view additional benchmark and query information</p>}
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
