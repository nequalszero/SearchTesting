import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Sidebar = (props) => {
  const queryGist = <code data-gist-id={props.queryGistId} data-gist-show-spinner="true"></code>;
  const benchmark = <p>{`${props.benchmark}`}</p>;

  return (
    <div className="sidebar-container">
      <nav className="panels">
        <li className="left" onClick={() => props.handlePanelSelect('benchmark')}>Benchmark</li>
        <li className="right" onClick={() => props.handlePanelSelect('gist')}>View Query</li>
      </nav>
      { (props.activePanel === "benchmark") && props.benchmark && queryGist }
      { (props.activePanel === "gist") && props.queryGistId && queryGist }
      { !props.benchmark && <p>Click a bar on the chart to view additional benchmark and query information</p>}
    </div>
  );
}

Sidebar.propTypes = {
  queryGistId: PropTypes.string,
  benchmark: PropTypes.object,
  activePanel: PropTypes.string.isRequired,
  handlePanelSelect: PropTypes.func.isRequired
};

export default Sidebar;
