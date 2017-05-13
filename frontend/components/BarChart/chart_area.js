import React from 'react';
import PropTypes from 'prop-types';

class ChartArea extends React.Component {
  chartForeGround() {
    return this.props.data.map((dataObj, idx) => (
      <rect fill="#74d3eb" rx="3" ry="3" key={idx}
        x={this.props.xScale(dataObj.query_key)} y={this.props.yScale(dataObj.value) - this.props.height} className="shadow"
        height={this.props.height-this.props.yScale(dataObj.value)}
        width={this.props.xScale.bandwidth()}/>
    ));
  }

  render() {
    return (
      <g transform={`translate(${this.props.translateX}, ${this.props.translateY})`}>
        {this.chartForeGround()}
      </g>
    )
  }
}

ChartArea.propTypes = {
  translateX: PropTypes.number.isRequired,
  translateY: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    query_key: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  })).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
};

export default ChartArea;
