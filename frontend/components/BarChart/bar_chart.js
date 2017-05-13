import React from 'react';
import * as d3 from 'd3';
import Axis from './axis';
import ChartArea from './chart_area';

class BarChart extends React.Component {
  state = {
    axisMounted: false
  }

  yAxisProps = {
    axisLength: 300,
    scaleType: "linear",
    values: this.props.dataHash.map((timeObj) => timeObj.user),
    translateX: 100,
    translateY: 30,
    axisType: "left",
    axisLabelProps: {
      rotation: -90,
      text: "Time (seconds)",
      translateX: -20
    }
  };

  xAxisProps = {
    axisLength: 450,
    scaleType: "band",
    translateX: 100,
    translateY: 330,
    values: this.props.dataHash.map((timeObj) => timeObj.query_key).reverse(),
    axisType: "bottom",
    tickTransformation: {
      tickRotation: -45
    },
    axisLabelProps: {
      text: "Query",
      translateY: 20
    }
  };

  chartAreaProps = {
    translateX: 100,
    translateY: 330,
    data: this.props.dataHash.map((timeObj) => ({query_key: timeObj.query_key, value: timeObj.user})),
    width: 450,
    height: 300
  };

  componentDidMount() {
    this.chartAreaProps.xScale = this.xScale;
    this.chartAreaProps.yScale = this.yScale;
    this.setState({axisMounted: true})
  }

  componentWillReceiveProps(nextProps) {
    this.yAxisProps.values = nextProps.dataHash.map((timeObj) => timeObj.user);
    this.xAxisProps.values = nextProps.dataHash.map((timeObj) => timeObj.query_key).reverse();
    this.chartAreaProps.data = nextProps.dataHash.map((timeObj) => ({query_key: timeObj.query_key, value: timeObj.user}));
  }

  render () {
    return (
      <svg className="chart-area">
        <g>
          <Axis {...this.yAxisProps}
            axisRef={(scale) => {this.yScale = scale}}/>
          <Axis {...this.xAxisProps}
            onTickClick={() => {console.log("clicked tick")}}
            axisRef={(scale) => {this.xScale = scale}}/>
          {this.state.axisMounted && <ChartArea {...this.chartAreaProps}/>}
        </g>
      </svg>
    )
  }
}

export default BarChart;
