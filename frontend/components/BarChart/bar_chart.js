import React from 'react';
import * as d3 from 'd3';
import Axis from './axis';
import ChartArea from './chart_area';
import ChartTitle from './chart_title';
import Grid from './grid';

class BarChart extends React.Component {
  state = {
    axesMounted: false
  }

  chartTitleProps = {
    text: this.props.currentKey,
    translateX: 325,
    translateY: 25
  }

  yAxisProps = {
    axisLength: 300,
    scaleType: "linear",
    values: this.props.dataHash.map((timeObj) => timeObj.real),
    translateX: 100,
    translateY: 30,
    axisType: "left",
    axisLabelProps: {
      rotation: -90,
      text: "Time (seconds)",
      translateX: -20
    },
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
    },
    barPadding: 0.25,
    className: "axis axis-x"
  };

  horizontalGridProps = {
    tickLength: this.xAxisProps.axisLength + 1,  // + 1 to get rid of black pixel from left over from setting axis.tickSizeOuter(0);
    translateX: this.yAxisProps.translateX,
    translateY: this.yAxisProps.translateY,
    axisType: this.yAxisProps.axisType,
    values: this.props.dataHash.map((timeObj) => timeObj.real),
    className: "gridline",
    ticks: 9,
  }

  chartAreaProps = {
    translateX: 100,
    translateY: 330,
    data: this.props.dataHash.map((timeObj) => ({query_key: timeObj.query_key, value: timeObj.real})),
    width: 450,
    height: 300
  };

  componentDidMount() {
    this.chartAreaProps.xScale = this.xScale;
    this.chartAreaProps.yScale = this.yScale;
    this.horizontalGridProps.scale = this.yScale;
    this.setState({axesMounted: true})
  }

  componentWillReceiveProps(nextProps) {
    this.yAxisProps.values = nextProps.dataHash.map((timeObj) => timeObj.real);
    this.xAxisProps.values = nextProps.dataHash.map((timeObj) => timeObj.query_key).reverse();
    this.chartAreaProps.data = nextProps.dataHash.map((timeObj) => ({query_key: timeObj.query_key, value: timeObj.real}));
    this.chartTitleProps.text = nextProps.currentKey;
  }

  render () {
    return (
      <svg className="chart-area">
        <g>
          <ChartTitle {...this.chartTitleProps}/>
          <Axis {...this.yAxisProps}
            axisRef={(scale) => {this.yScale = scale}}/>
          <Axis {...this.xAxisProps}
            onTickClick={() => {console.log("clicked tick")}}
            axisRef={(scale) => {this.xScale = scale}}/>
          {this.state.axesMounted && <Grid {...this.horizontalGridProps}/>}
          {this.state.axesMounted && <ChartArea {...this.chartAreaProps}/>}
        </g>
      </svg>
    )
  }
}

export default BarChart;
