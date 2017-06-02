import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import DonutChartShadow from './donut_chart_shadow';
import DonutChartPath from './donut_chart_path';

class DonutChart extends React.Component {
  constructor(props) {
    super(props);
    this.pie = d3.pie()
                 .value((data) => (data[this.props.valueKey]))
                 .padAngle(this.props.padAngle)
                 .sort(null);

    this.color = d3.scaleOrdinal()
                   .range(this.props.color);

    this.state = {width: this.props.width};
  }

  render() {
    let shadow, legend;

    if (this.props.enable3D) {
      shadow = (
        <DonutChartShadow width={this.state.width}
          height={this.props.height}
          innerRadiusRatio={this.props.innerRadiusRatio}
          pie={this.pie}
          color={this.color}
          data={this.props.data}
          shadowSize={this.props.shadowSize}/>
      );
    }


    return (
      <div>
        <svg className={this.props.id}>
          <g transform={`translate(${this.props.translateX}, ${this.props.translateY})`}>
            {shadow}
            <DonutChartPath width={this.state.width}
              height={this.props.height}
              innerRadiusRatio={this.props.innerRadiusRatio}
              pie={this.pie}
              color={this.color}
              data={this.props.data}
              labels={this.props.labels}
              formatLabel={this.props.formatLabel}
              labelKey={this.props.labelKey}/>

            {legend}
          </g>
        </svg>
      </div>
    );
  }
}


DonutChart.propTypes = {
  color: PropTypes.array,
  data: PropTypes.array.isRequired,
  enable3D: PropTypes.bool,
  formatLabel: PropTypes.func,
  height: PropTypes.number,
  id: PropTypes.string.isRequired,
  innerRadiusRatio: PropTypes.number,
  labelKey: PropTypes.string,
  labels: PropTypes.bool,
  padAngle: PropTypes.number,
  valueKey: PropTypes.string,
  width: PropTypes.number,
};

DonutChart.defaultProps = {
  color:[],
  formatLabel: (label) => (label),
  height: 250,
  innerRadiusRatio:3.3,
  labels: false,
  padAngle:0,
  width: 500,
};

export default DonutChart;
