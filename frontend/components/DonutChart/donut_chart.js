import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import DonutChartShadow from './donut_chart_shadow';
import DonutChartPath from './donut_chart_path';
import CenterText from './center_text';

class DonutChart extends React.Component {
  constructor(props) {
    super(props);
    this.pie = d3.pie()
                 .value((data) => (data[this.props.valueKey]))
                 .padAngle(this.props.padAngle)
                 .sort(null);

    this.color = d3.scaleOrdinal()
                   .range(this.props.color);
  }

  constructShadow() {
    return (
      <DonutChartShadow width={this.props.width}
        height={this.props.height}
        innerRadiusRatio={this.props.innerRadiusRatio}
        pie={this.pie}
        color={this.color}
        data={this.props.data}
        shadowSize={this.props.shadowSize}/>
    );
  }

  constructCenterText() {
    const value = this.props.data.reduce((a, b) => ({
      [this.props.valueKey]: a[this.props.valueKey] + b[this.props.valueKey]
    }));
    const text = this.props.formatLabel(value[this.props.valueKey]);

    return (
      <CenterText text={text}
        translateX={this.props.height/2}
        translateY={this.props.height/2}/>
    )
  }

  render() {
    let legend;

    return (
      <div>
        <svg className={this.props.className}>
          <g transform={`translate(${this.props.translateX}, ${this.props.translateY})`}>

            {this.props.enabled3D && this.constructShadow()}

            <DonutChartPath color={this.color}
              data={this.props.data}
              formatLabel={this.props.formatLabel}
              height={this.props.height}
              innerRadiusRatio={this.props.innerRadiusRatio}
              labelKey={this.props.labelKey}
              labels={this.props.labels}
              pie={this.pie}
              width={this.props.width}/>

            { this.props.displaySumInCenter && this.constructCenterText() }

            {legend}
          </g>
        </svg>
      </div>
    );
  }
}


DonutChart.propTypes = {
  className: PropTypes.string.isRequired,
  color: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.array.isRequired,
  displaySumInCenter: PropTypes.bool.isRequired,
  enable3D: PropTypes.bool,
  formatLabel: PropTypes.func,
  height: PropTypes.number,
  innerRadiusRatio: PropTypes.number,
  labelKey: PropTypes.string,
  labels: PropTypes.bool,
  padAngle: PropTypes.number,
  valueKey: PropTypes.string,
  width: PropTypes.number,
};

DonutChart.defaultProps = {
  enabled3D: true,
  formatLabel: (label) => (label),
  height: 250,
  innerRadiusRatio: 3.3,
  labels: true,
  padAngle: 0,
  width: 500,
};

export default DonutChart;
