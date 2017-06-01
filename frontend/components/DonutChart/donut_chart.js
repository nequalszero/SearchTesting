import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import DonutChartShadow from './donut_chart_shadow';
import DonutChartPath from './donut_chart_path';

class DonutChart extends React.Component {
  constructor(props) {
    super(props);
    this.pie = d3.pie()
                 .value((data) => (data[this.props.point]))
                 .padAngle(this.props.padAngle)
                 .sort(null);

    this.color = d3.scaleOrdinal()
                   .range(this.props.color);

    this.state = {width: this.props.width};
  }

  render() {
    let shadow, legend;

    if (this.props.enable3d) {
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
        <svg id={this.props.id} width={this.state.width} height={this.props.height}>

          {shadow}

          <DonutChartPath width={this.state.width}
            height={this.props.height}
            innerRadiusRatio={this.props.innerRadiusRatio}
            pie={this.pie}
            color={this.color}
            data={this.props.data} />

          {legend}

        </svg>
      </div>
    );
  }
}


DonutChart.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  padAngle: PropTypes.number,
  id: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  color: PropTypes.array,
  enable3d: PropTypes.bool,
  innerRadiusRatio: PropTypes.number,
  label: PropTypes.string,
  point: PropTypes.string
};

DonutChart.defaultProps = {
  width: 500,
  height: 250,
  padAngle:0,
  color:[],
  innerRadiusRatio:3.3
};

export default DonutChart;
