import React from 'react';
import PropTypes from 'prop-types';

class DonutChartLegend extends React.Component {
  constructor(props) {
    super(props);
    this.updateD3(props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateD3(nextProps);
  }

  updateD3(props) {
    this.legendEntries = props.pie(props.data).map((data, idx) => {
      let transform = `translate(10, ${idx * 30})`;

      let rectStyle = {
        fill: props.color(idx),
        stroke: props.color(idx)
      };

      let textStyle = {
        fill: props.color(idx)
      };

      return (
        <g transform={transform} key={idx}>
          <rect width="20" height="20" style={rectStyle}
            rx={props.radius} ry={props.radius} />
          <text x="30" y="15" className="legend-entry" style={textStyle}>
            {data.data[props.labelKey]}
          </text>
        </g>
      );
    })

    const translateX = props.translateX + 40
    const translateY = props.height/2 - props.data.length*30/2

    this.transform = `translate(${[translateX, translateY]})`
  }

  render() {
    return (
      <g transform={this.transform}>
        {this.legendEntries}
      </g>
    )
  }
}

DonutChartLegend.propTypes = {
  color: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  labelKey: PropTypes.string.isRequired,
  pie: PropTypes.func.isRequired,
  radius: PropTypes.number.isRequired,
  translateX: PropTypes.number.isRequired,
};

export default DonutChartLegend;
