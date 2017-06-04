import React from 'react';
import PropTypes from 'prop-types';

class QueryGist extends React.Component {
  // Necessary to make the gist show up when loading gists after the initial
  //   page load.
  componentDidMount() {
    $('[data-gist-id]').gist();
  }

  // Avoid excessive rerendering when hovering over the bar chart.
  shouldComponentUpdate(nextProps) {
    return nextProps.queryGistId !== this.props.queryGistId;
  }

  // Necessary to make the gist show up when loading gists after the initial
  //   page load.
  componentDidUpdate() {
    if (this.props.queryGistId) $('[data-gist-id]').gist();
  }

  render() {
    return (
      <div className={`query-gist ${this.props.queryGistId}`}>
        <code data-gist-id={this.props.queryGistId}
          data-gist-show-spinner="true"
          data-gist-hide-footer="true"
          data-gist-enable-cache="true">
        </code>
      </div>
    );
  }
}

QueryGist.propTypes = {
  queryGistId: PropTypes.string.isRequired
};

export default QueryGist;
