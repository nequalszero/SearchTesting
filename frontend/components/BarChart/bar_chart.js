import React from 'react';
import * as d3 from 'd3';
import Axis from './axis';

class BarChart extends React.Component {
  render () {
    const yAxisProps = {
      height: 300,
      values: this.props.dataHash.map((timeObj) => timeObj.user),
      translateX: 50,
      translateY: 30
    }

    console.log(this.props);
    return (
      <svg className="chart-area">
        <g>
          <Axis {...yAxisProps}/>
          <text transform="translate(70, 120) rotate(-90)">Time (seconds)</text>
        </g>
      </svg>
    )
  }
}

export default BarChart;
