import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class SchemaGist extends React.Component {
  // Avoid excessive rerendering when hovering over the bar chart.
  shouldComponentUpdate(nextProps) {
    return nextProps.schemaGistOpen !== this.props.schemaGistOpen;
  }

  // Necessary to make the gist show up when loading gists after the initial
  //   page load.
  componentDidUpdate() {
    if (this.props.schemaGistOpen) $('[data-gist-id]').gist();
  }

  getClassName() {
    return classNames({
      "schema-gist-container": true,
      "open": this.props.schemaGistOpen,
      "closed": !this.props.schemaGistOpen
    });
  }

  getBarText() {
    return this.props.schemaGistOpen ? "Close Schema" : "Expand Schema";
  }

  render() {
    return (
      <div className="schema-gist">
        <div className="schema-gist-toggle-bar" onClick={this.props.handleClick}>
          {this.getBarText()}
        </div>
        <div className={this.getClassName()}>
          <code data-gist-id={this.props.gistId} data-gist-show-spinner="true"></code>
        </div>
      </div>
    );
  }
}

SchemaGist.propTypes = {
  gistId: PropTypes.string.isRequired,
  schemaGistOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default SchemaGist;
