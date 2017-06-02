import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class DonutChartPath extends React.Component {
  constructor(props) {
    super(props);
    this.updateD3(props);

    // State being used to update the label text element transforms
    //   accounting for element sizes after the initial rendering.
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
    // Used to store node references to the text labels.
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

  // Creates label transform(translate()) string, using the center of each arc
  //   wedge and the height/width of the label text element when available.
  labelTransform(data, labelKey) {
    if (this.labelNodes[labelKey]) {
      const { width, height } = this.labelNodes[labelKey].getBBox();
      const [cX, cY] = this.arc.centroid(data);

      return `translate(${[cX -width/2, cY + height/2]})`
    } else {
      return `translate(${this.arc.centroid(data)})`
    }
  }

  // Not bothering to store labels in an instance variable since the label
  //   transforms are being updated after rendering, and the createLabels()
  //   method is being called in the render method.
  createLabels() {
    return this.props.pie(this.props.data).map((data, idx) => {
      // Don't label the really small wedges.
      if (data.endAngle - data.startAngle < 0.1) return null;
      let labelKey = data.data[this.props.labelKey]

      // Note the ref being placed on each label element for easy reference
      //   and subsequently easy access to the height/width for repositioning.
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
      <path key={idx} className="arc" fill={props.color(idx)}
        d={this.arc(data)}>
      </path>
    ));
  }

  // Intentionally not rendering each text label element as an adjacent sibling
  //  to its corresponding arc wedge to ensure that all text elements are visible
  //  (in front of the wedges).  CSS z-index does not work on SVG.
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
  color: PropTypes.func,
  data: PropTypes.array,
  formatLabel: PropTypes.func,
  height: PropTypes.number,
  innerRadiusRatio: PropTypes.number,
  labelKey: PropTypes.string,
  labels: PropTypes.bool,
  pie: PropTypes.func,
  width: PropTypes.number,
}

DonutChartPath.defaultProps = {
  formatLabel: (label) => (label)
}

export default DonutChartPath;
