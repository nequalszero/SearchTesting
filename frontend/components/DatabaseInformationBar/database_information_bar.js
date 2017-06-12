import React from 'react';
import PropTypes from 'prop-types';
import {formatWithCommas} from '../../lib/miscellaneous_functions';

class DatabaseInformationBar extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="database-information-bar">
        <p className="description">Table Sizes:</p>
        <p className="table-name-container">
          <span className="table-name">Products: </span>
          <span className="num-rows"><span className="first">{formatWithCommas(this.props.products)}</span> rows</span></p>
        <p className="table-name-container">
          <span className="table-name">TagNames: </span>
          <span className="num-rows"><span className="second">{formatWithCommas(this.props.tag_names)}</span> rows</span></p>
        <p className="table-name-container">
          <span className="table-name">Tags: </span>
          <span className="num-rows"><span className="third">{formatWithCommas(this.props.tags)}</span> rows</span></p>
      </div>
    );
  }
}

DatabaseInformationBar.propTypes = {
  products: PropTypes.number.isRequired,
  tag_names: PropTypes.number.isRequired,
  tags: PropTypes.number.isRequired,
}

export default DatabaseInformationBar;
