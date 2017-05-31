import React from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

import Axis from './axis';
import ChartArea from './chart_area';
import ChartTitle from './chart_title';
import Grid from './grid';

class BarChart extends React.Component {
  state = {
    axesMounted: false
  };

  chartTitleProps = {
    text: this.props.currentKey,
    translateX: this.props.translateX + this.props.xAxisLength/2,
    translateY: 35
  };

  yAxisProps = {
    axisLength: this.props.yAxisLength,
    scaleType: "linear",
    values: this.props.dataHash.map((timeObj) => timeObj.real),
    translateX: this.props.translateX,
    translateY: this.props.translateY,
    axisType: "left",
    axisLabelProps: {
      rotation: -90,
      text: "Time (seconds)",
      translateX: -20
    }
  };

  xAxisProps = {
    axisLength: this.props.xAxisLength,
    scaleType: "band",
    translateX: this.props.translateX,
    translateY: this.props.translateY + this.props.yAxisLength,
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
    translateX: this.props.translateX,
    translateY: this.props.translateY + this.props.yAxisLength,
    data: this.props.dataHash.map((timeObj) => ({query_key: timeObj.query_key, value: timeObj.real})),
    width: this.props.xAxisLength,
    height: this.props.yAxisLength
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

BarChart.propTypes = {
  xAxisLength: PropTypes.number.isRequired,
  yAxisLength: PropTypes.number.isRequired,
  translateX: PropTypes.number.isRequired,
  translateY: PropTypes.number.isRequired,
  queryKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentKey: PropTypes.string.isRequired,
  dataHash: PropTypes.arrayOf(PropTypes.shape({
    query_key: PropTypes.string.isRequired,
    system: PropTypes.number.isRequired,
    user: PropTypes.number.isRequired,
    real: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  })).isRequired
};

export default BarChart;
