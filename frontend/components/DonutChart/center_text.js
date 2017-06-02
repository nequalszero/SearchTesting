import React from 'react';
import PropTypes from 'prop-types';

class CenterText extends React.Component {
  state = { nodeMounted: false }

  componentDidMount() {
    if (!this.state.nodeMounted) this.setState({nodeMounted: true});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({nodeMounted: false});
  }

  componentDidUpdate() {
    if (!this.state.nodeMounted) this.setState({nodeMounted: true});
  }

  calculateTransform() {
    if (this.textNode) {
      const { height, width } = this.textNode.getBBox();
      return `translate(${[this.props.translateX - width/2, this.props.translateY + height/2]})`;
    }

    return `translate(${[this.props.translateX, this.props.translateY]})`;
  }

  render() {
    return (
      <text className="donut-chart-center-text"
        ref={(node) => this.textNode = node}
        transform={this.calculateTransform()}>
        {this.props.text}
      </text>
    )
  }
}

CenterText.propTypes = {
  text: PropTypes.string.isRequired,
  translateX: PropTypes.number.isRequired,
  translateY: PropTypes.number.isRequired,
};

export default CenterText;
