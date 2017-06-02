import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class DonutChartShadow extends React.Component {
  constructor(props) {
    super(props);
    this.radius = this.props.height;
    this.outerRadius = (this.radius/this.props.innerRadiusRatio) + 1;
    this.innerRadius = this.outerRadius - this.props.shadowSize;

    this.arc = d3.arc()
                 .outerRadius(this.outerRadius)
                 .innerRadius(this.innerRadius);

    this.transform = `translate(${this.radius/2}, ${this.radius/2})`;
  }

  createChart() {
    const paths = this.props.pie(this.props.data).map((value, idx) => {
      let shadowColor = d3.hsl(this.props.color(idx));
      shadowColor = d3.hsl((shadowColor.h + 5), (shadowColor.s - 0.07), (shadowColor.l - 0.10));

      return (
        <path fill={shadowColor} d={this.arc(value)} key={idx}></path>
      );
    })

    return paths;
  }

  render() {
    const paths = this.createChart();

    return (
      <g transform={this.transform}>
        {paths}
      </g>
    );
  }
}

DonutChartShadow.defaultProps = {
  shadowSize: 10
};

DonutChartShadow.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.array,
    pie: PropTypes.func,
    color: PropTypes.func,
    innerRadiusRatio: PropTypes.number,
    shadowSize: PropTypes.number
};

export default DonutChartShadow;
