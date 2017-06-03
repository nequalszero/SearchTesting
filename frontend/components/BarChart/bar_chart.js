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
    axisLabelProps: {
      text: "Query",
      translateY: 20
    },
    axisLength: this.props.xAxisLength,
    axisType: "bottom",
    barPadding: 0.25,
    className: "axis axis-x",
    handleTickClick: (queryKey) => this.props.handlers.handleXTickClick(queryKey),
    handleTickMouseOver: (queryKey) => this.props.handlers.handleXTickMouseOver(queryKey),
    handleTickMouseOut: () => this.props.handlers.handleXTickMouseOut(),
    hoverKey: this.props.hoverKey,
    scaleType: "band",
    selectedKey: this.props.selectedKey,
    tickTransformation: {
      tickRotation: -45
    },
    translateY: this.props.translateY + this.props.yAxisLength,
    translateX: this.props.translateX,
    values: this.props.dataHash.map((timeObj) => timeObj.query_key).reverse(),
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
    data: this.props.dataHash.map((timeObj) => ({key: timeObj.query_key, value: timeObj.real})),
    width: this.props.xAxisLength,
    height: this.props.yAxisLength,
    handleClick: (queryKey) => this.props.handlers.handleBarClick(queryKey),
    handleMouseOver: (queryKey) => this.props.handlers.handleBarMouseOver(queryKey),
    handleMouseOut: () => this.props.handlers.handleBarMouseOut(),
    hoverKey: this.props.hoverKey,
    selectedKey: this.props.selectedKey,
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
    this.chartAreaProps.data = nextProps.dataHash.map((timeObj) => ({key: timeObj.query_key, value: timeObj.real}));
    this.chartAreaProps.selectedKey = nextProps.selectedKey;
    this.chartAreaProps.hoverKey = nextProps.hoverKey;
    this.xAxisProps.selectedKey = nextProps.selectedKey;
    this.xAxisProps.hoverKey = nextProps.hoverKey;
    this.chartTitleProps.text = nextProps.currentKey;
  }

  render () {
    return (
      <svg className="bar-chart-area">
        <g>
          <ChartTitle {...this.chartTitleProps}/>
          <Axis {...this.yAxisProps}
            axisRef={(scale) => {this.yScale = scale}}/>
          <Axis {...this.xAxisProps}
            axisRef={(scale) => {this.xScale = scale}}/>
          {this.state.axesMounted && <Grid {...this.horizontalGridProps}/>}
          {this.state.axesMounted && <ChartArea {...this.chartAreaProps}/>}
        </g>
      </svg>
    )
  }
}

BarChart.propTypes = {
  currentKey: PropTypes.string.isRequired,
  dataHash: PropTypes.arrayOf(PropTypes.shape({
    query_key: PropTypes.string.isRequired,
    system: PropTypes.number.isRequired,
    user: PropTypes.number.isRequired,
    real: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
  })).isRequired,
  handlers: PropTypes.shape({
    handleBarClick: PropTypes.func,
    handleBarMouseOver: PropTypes.func,
    handleBarMouseOut: PropTypes.func,
    handleXTickClick: PropTypes.func,
    handleXTickMouseOver: PropTypes.func,
    handleXTickMouseOut: PropTypes.func,
    handleYTickClick: PropTypes.func,
    handleYTickMouseOver: PropTypes.func,
    handleYTickMouseOut: PropTypes.func,
  }).isRequired,
  hoverKey: PropTypes.string,
  queryKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedKey: PropTypes.string,
  translateX: PropTypes.number.isRequired,
  translateY: PropTypes.number.isRequired,
  xAxisLength: PropTypes.number.isRequired,
  yAxisLength: PropTypes.number.isRequired,
};

export default BarChart;
