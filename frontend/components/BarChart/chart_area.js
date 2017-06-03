import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ChartArea = (props) => {
  const barClass = (key) => (
    classNames({
      'chart-bar': true,
      active: props.selectedKey === key,
      'hovering-over': props.hoverKey === key
    })
  );

  const chartForeGround = () => {
    return props.data.map((dataObj, idx) => (
      <rect key={idx} className={ barClass(dataObj.key) }
        x={props.xScale(dataObj.key)}
        y={props.yScale(dataObj.value) - props.height}
        height={props.height-props.yScale(dataObj.value)}
        width={props.xScale.bandwidth()}
        onClick={() => props.handleClick(dataObj.key)}
        onMouseEnter={() => props.handleMouseOver(dataObj.key)}
        onMouseLeave={() => props.handleMouseOut()}/>
    ));
  };

  return (
    <g transform={`translate(${props.translateX}, ${props.translateY})`}>
      {chartForeGround()}
    </g>
  );
}

ChartArea.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  })).isRequired,
  handleClick: PropTypes.func,
  height: PropTypes.number.isRequired,
  hoverKey: PropTypes.string,
  selectedKey: PropTypes.string,
  translateX: PropTypes.number.isRequired,
  translateY: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
};

export default ChartArea;
