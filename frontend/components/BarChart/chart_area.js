import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class ChartArea extends React.Component {
  chartForeGround() {
    return this.props.data.map((value, idx) => (
      <rect fill="#74d3eb" rx="3" ry="3" key={i}
        x={x(d.month)} y={y(d.value)} className="shadow"
        height={h-y(d.value)}
        width={x.rangeBand()}/>
    ));
  }

  render() {
    return (
      <g transform={`translate(${this.props.translateX}, ${this.props.translateY})`}>
        {rectForeground}
      </g>
    )
  }
}

ChartArea.propTypes = {
  translateX: PropTypes.number.isRequired,
  translateY: PropTypes.number.isRequired,
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  width: PropTypes.number.isRequired
};

export default ChartArea;
