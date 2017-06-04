import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class DonutChartShadow extends React.Component {
  constructor(props) {
    super(props);
    this.updateD3(props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateD3(nextProps);
  }

  updateD3(props) {
    this.outerRadius = (props.diameter/props.innerRadiusRatio) + 1;
    this.innerRadius = this.outerRadius - props.shadowSize;

    this.arc = d3.arc()
                 .outerRadius(this.outerRadius)
                 .innerRadius(this.innerRadius);

    this.transform = `translate(${props.diameter/2}, ${props.diameter/2})`;
    this.paths = this.createShadowPaths();
  }

  createShadowPaths() {
    return this.props.pie(this.props.data).map((value, idx) => {
      let shadowColor = d3.hsl(this.props.color(idx));
      shadowColor = d3.hsl((shadowColor.h + 5), (shadowColor.s - 0.07), (shadowColor.l - 0.10));

      return (
        <path fill={shadowColor} d={this.arc(value)} key={idx}></path>
      );
    })
  }

  render() {
    return (
      <g transform={this.transform}>
        {this.paths}
      </g>
    );
  }
}

DonutChartShadow.defaultProps = {
  shadowSize: 10
};

DonutChartShadow.propTypes = {
  color: PropTypes.func,
  data: PropTypes.array,
  diameter: PropTypes.number,
  innerRadiusRatio: PropTypes.number,
  pie: PropTypes.func,
  shadowSize: PropTypes.number,
  width: PropTypes.number,
};

export default DonutChartShadow;
