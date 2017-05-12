import React from 'react';
import * as d3 from 'd3';
import Axis from './axis';

class BarChart extends React.Component {
  yAxisProps = {
    axisLength: 300,
    values: this.props.dataHash.map((timeObj) => timeObj.user),
    translateX: 100,
    translateY: 30,
    axisType: "left",
    axisLabelRotation: -90,
    axisLabelText: "Time (seconds)"
  };

  xAxisProps = {
    axisLength: 450,
    translateX: 100,
    translateY: 330,
    axisType: "bottom",
    axisLabelText: "Query"
  };

  componentWillReceiveProps(nextProps) {
    this.yAxisProps.values = nextProps.dataHash.map((timeObj) => timeObj.user)
  }

  render () {
    console.log(this.yAxisProps.values[0]);
    return (
      <svg className="chart-area">
        <g>
          <Axis {...this.yAxisProps}/>
          <Axis {...this.xAxisProps}/>
        </g>
      </svg>
    )
  }
}

export default BarChart;
