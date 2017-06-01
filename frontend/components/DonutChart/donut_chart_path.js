import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class DonutChartPath extends React.Component {
  constructor(props) {
    super(props);
    this.radius = this.props.height;
    this.outerRadius = this.radius/2;
    this.innerRadius = this.radius/this.props.innerRadiusRatio;

    this.arc = d3.arc()
                 .outerRadius(this.outerRadius)
                 .innerRadius(this.innerRadius);

    this.transform = `translate(${this.radius/2}, ${this.radius/2})`;
  }

  createChart() {
    const paths = this.props.pie(this.props.data).map((value, idx) => (
      <path fill={this.props.color(idx)} d={this.arc(value)} key={idx}></path>
    ))
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

DonutChartPath.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    data: PropTypes.array,
    pie: PropTypes.func,
    color: PropTypes.func,
    innerRadiusRatio: PropTypes.number
}

export default DonutChartPath;
