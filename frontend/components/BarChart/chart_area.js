import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const ChartArea = (props) => {
  const barClass = (queryKey) => {
    // console.log(queryKey, props.selectedBar);
    return classNames({
      'chart-bar': true,
      active: props.selectedBar === queryKey
    });
  }

  const chartForeGround = () => {
    return props.data.map((dataObj, idx) => (
      <rect key={idx} className={ barClass(dataObj.query_key) }
        x={props.xScale(dataObj.query_key)}
        y={props.yScale(dataObj.value) - props.height}
        height={props.height-props.yScale(dataObj.value)}
        width={props.xScale.bandwidth()}
        onClick={() => props.handleClick(dataObj.query_key)}/>
    ));
  }

  return (
    <g transform={`translate(${props.translateX}, ${props.translateY})`}>
      {chartForeGround()}
    </g>
  );
}

ChartArea.propTypes = {
  translateX: PropTypes.number.isRequired,
  translateY: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    query_key: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  })).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  selectedBar: PropTypes.string
};

export default ChartArea;
