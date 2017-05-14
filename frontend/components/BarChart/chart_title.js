import React from 'react';

class ChartTitle extends React.Component {
  componentDidMount() {
    this.forceUpdate();
  }

  componentDidUpdate() {

  }

  transformation() {
    if (!this.textNode) {
      return `translate(${this.props.translateX}, ${this.props.translateY})`
    }
    return `translate(${this.props.translateX - this.textNode.getBBox().width/2}, ${this.props.translateY})`
  }

  render() {
    return (
      <text transform={this.transformation()}
        className="chart-title"
        ref={(node) => this.textNode = node}>
        {this.props.text}
      </text>
    );
  }
}

export default ChartTitle;
