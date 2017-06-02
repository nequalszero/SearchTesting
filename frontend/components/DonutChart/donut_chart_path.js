import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class DonutChartPath extends React.Component {
  constructor(props) {
    super(props);
    this.updateD3(props);
    this.state = { newLabelNodes: true };
  }

  componentDidMount() {
    if (this.state.newLabelNodes) this.setState({newLabelNodes: false});
  }

  componentDidUpdate() {
    if (this.state.newLabelNodes) this.setState({newLabelNodes: false});
  }

  componentWillReceiveProps(nextProps) {
    this.updateD3(nextProps);
    this.setState({newLabelNodes: true})
  }

  updateD3(props) {
    this.labelNodes = {};

    this.radius = props.height;
    this.outerRadius = this.radius/2;
    this.innerRadius = this.radius/props.innerRadiusRatio;

    this.arc = d3.arc()
                 .outerRadius(this.outerRadius)
                 .innerRadius(this.innerRadius);

    this.transform = `translate(${this.radius/2}, ${this.radius/2})`;
    this.createPaths(props);
  }

  // expects a transform string with translateX and translateY values.
  parseTransform(transformValue) {
    const openParenIdx = transformValue.indexOf('(');
    const commaIdx = transformValue.indexOf(',');
    const closeParenIdx = transformValue.length - 1;

    return {
      translateX: parseFloat(transformValue.slice(openParenIdx + 1, commaIdx)),
      translateY: parseFloat(transformValue.slice(commaIdx + 1, closeParenIdx))
    };
  }

  updateLabels() {
    if (this.props.labels) {
      this.gNode.childNodes.forEach((nestedGNode) => {
        nestedGNode.childNodes.forEach((node) => {
          if (node.tagName === "text") {
            let {height, width} = node.getBBox();
            let {translateX, translateY} = this.parseTransform(node.getAttribute('transform'));
            node.setAttribute('transform', `translate(${translateX - width/2}, ${translateY - height/2})`)
          }
        })
      })

      d3.select(this.gNode).call(this.arc);
    }
  }

  labelTransform(data, labelKey) {
    if (this.labelNodes[labelKey]) {
      const { width, height } = this.labelNodes[labelKey].getBBox();
      const [cX, cY] = this.arc.centroid(data);

      return `translate(${[cX -width/2, cY + height/2]})`
    } else {
      return `translate(${this.arc.centroid(data)})`
    }
  }

  createLabels() {
    return this.props.pie(this.props.data).map((data, idx) => {
      if (data.endAngle - data.startAngle < 0.1) return null;
      let labelKey = data.data[this.props.labelKey]

      return (
        <text transform={this.labelTransform(data, labelKey)}
          ref={ (node) => this.labelNodes[labelKey] = node }
          key={labelKey}>
          { this.props.formatLabel(data.value) }
        </text>
      );
    });
  }

  createPaths(props) {
    // value is an object with the attributes:
    //  data: resembles the objects passed inside props.data,
    //  endAngle, startAngle, index, padAngle, and
    //  value (probably duplicate of value inside data attribute)
    this.paths = props.pie(props.data).map((data, idx) => (
      <g key={idx} className="arc">
        <path fill={props.color(idx)}
          d={this.arc(data)}>
        </path>
      </g>
    ));
  }

  render() {
    return (
      <g ref={(gNode) => this.gNode = gNode} transform={this.transform}>
        {this.paths}
        {this.props.labels && this.createLabels()}
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
  innerRadiusRatio: PropTypes.number,
  labels: PropTypes.bool,
  formatLabel: PropTypes.func,
  labelKey: PropTypes.string
}

DonutChartPath.defaultProps = {
  formatLabel: (label) => (label)
}

export default DonutChartPath;
