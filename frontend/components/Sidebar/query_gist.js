import React from 'react';
import PropTypes from 'prop-types';

const QueryGist = (props) => {
  console.log(`rendering gist with id: ${props.queryGistId}`);
  return (
    <div className={`query-gist ${props.queryGistId}`}>
      <code data-gist-id={props.queryGistId}
        data-gist-show-spinner="true"
        data-gist-hide-footer="true">
      </code>
    </div>
  )
}

QueryGist.propTypes = {
  queryGistId: PropTypes.string.isRequired
};

export default QueryGist;
