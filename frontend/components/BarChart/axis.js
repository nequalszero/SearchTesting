import React from 'react';
import * as d3 from 'd3';
import { createAxisLabelTransform } from '../../lib/axis_helper';

class Axis extends React.Component {
  constructor(props) {
    super(props);

    this.scale = d3.scaleLinear();
    this.axis = this.selectAxisType(this.props.axisType, this.scale);
    this.updateD3(props);
  }

  componentDidMount() {
    this.renderAxis();
    this.forceUpdate();
  }

  componentWillReceiveProps(newProps) {
    this.updateD3(newProps);
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  calculateAxisLabelTransform() {
    return createAxisLabelTransform(this.textNode, this.axisNode, this.props);
  }

  selectAxisType(type, scale) {
    switch(type) {
      case "left":
        return d3.axisLeft(scale);
      case "bottom":
        return d3.axisBottom(scale);
      default:
        throw `Error in Axis#selectAxisType: invalid type ${type}`;
    }
  }

  updateD3(props) {
    if (props.values) {
      const dataMax = d3.max(props.values);

      this.scale
          .domain(d3.extent([0, dataMax*1.1]))
          .range([props.axisLength, 0]);
    } else {
      this.scale.range([props.axisLength, 0]);
    }
  }

  renderAxis() {
    d3.select(this.axisNode).call(this.axis)
  }

  render() {
    return (
      <g>
        <g className="axis"
          ref={(axisNode) => this.axisNode = axisNode}
          transform={`translate(${this.props.translateX}, ${this.props.translateY})`}>
        </g>
        <text transform={this.calculateAxisLabelTransform()} ref={(textNode) => this.textNode = textNode}>
          {this.props.axisLabelText}
        </text>
      </g>
    )
  }
}

Axis.propTypes = {
  axisType: React.PropTypes.string.isRequired,
  axisLength: React.PropTypes.number.isRequired,
  values: React.PropTypes.array,
  translateX: React.PropTypes.number.isRequired,
  translateY: React.PropTypes.number.isRequired,
  axisLabelRotation: React.PropTypes.number,
  axisLabelText: React.PropTypes.string,
  axisLabelPosition: React.PropTypes.string,
  axisLabelExtraPadding: React.PropTypes.number
};

export default Axis;
