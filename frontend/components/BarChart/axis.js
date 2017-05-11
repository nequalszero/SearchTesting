import React from 'react';
import * as d3 from 'd3';

class Axis extends React.Component {
  constructor(props) {
    super(props);

    this.yScale = d3.scaleLinear();
    this.axis = d3.axisLeft(this.yScale)
    this.updateD3(props);
  }

  componentDidMount() {
    this.renderAxis();
  }

  componentWillReceiveProps(newProps) {
    this.updateD3(newProps);
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  updateD3(props) {
    const dataMax = d3.max(props.values);

    this.yScale
        .domain(d3.extent([0, dataMax*1.1]))
        .range([props.height, 0]);
  }

  renderAxis() {
    d3.select(this.node).call(this.axis)
  }

  render() {
    const transform = `translate(${this.props.translateX}, ${this.props.translateY})`
    return (
      <g className="y-axis" ref={(node) => this.node = node} transform={transform}>
      </g>
    )
  }
}

export default Axis;
