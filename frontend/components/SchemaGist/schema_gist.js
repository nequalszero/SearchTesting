import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SchemaGist = (props) => {
  const getClassName = () => {
    return classNames({
      "schema-gist-container": true,
      "open": props.schemaGistOpen,
      "closed": !props.schemaGistOpen
    });
  }

  const getBarText = () => {
    return props.schemaGistOpen ? "Close Schema" : "Expand Schema";
  }

  return (
    <div className="schema-gist">
      <div className="schema-gist-toggle-bar" onClick={props.handleClick}>
        {getBarText()}
      </div>
      <div className={getClassName()}>
        <code data-gist-id={props.gistId} data-gist-show-spinner="true"></code>
      </div>
    </div>
  );
}

SchemaGist.propTypes = {
  gistId: PropTypes.string.isRequired,
  schemaGistOpen: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default SchemaGist;
