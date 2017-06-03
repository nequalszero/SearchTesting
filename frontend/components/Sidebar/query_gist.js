import React from 'react';
import PropTypes from 'prop-types';

class QueryGist extends React.Component {
  componentDidMount() {
    $('[data-gist-id]').gist();
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.queryGistId !== this.props.queryGistId;
  }

  componentDidUpdate() {
    if (this.props.queryGistId) $('[data-gist-id]').gist();
  }

  render() {
    console.log(this.props.queryGistId);
    return (
      <div className={`query-gist ${this.props.queryGistId}`}>
        <code data-gist-id={this.props.queryGistId}
          data-gist-show-spinner="true"
          data-gist-hide-footer="true">
        </code>
      </div>
    );
  }
}

QueryGist.propTypes = {
  queryGistId: PropTypes.string.isRequired
};

export default QueryGist;
