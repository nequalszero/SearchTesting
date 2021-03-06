import React from 'react';
import Swatch from './swatch';
import * as d3 from 'd3';

// Draws an entire color scale
class ColorBar extends React.Component {
  colors = d3.schemeCategory20;
  width = d3.scaleBand()
            .domain(d3.range(20));

  componentWillMount() {
    this.updateD3(this.props);
  }

  componentWillUpdate(newProps) {
    this.updateD3(newProps);
  }

  updateD3(props) {
    this.width.range([0, props.width]);
  }

  render() {
    return (
      <g>
        {d3.range(20).map(i => (
          <g key={i}>
            <Swatch color={this.colors[i]} width={this.width.step()} x={this.width(i)} y="0" />
            <Swatch color={this.colors[20 - 1 -i]} width={this.width.step()} x={this.width(i)} y="20"/>
          </g>
        ))}
      </g>
    )
  }
}

export default ColorBar;
