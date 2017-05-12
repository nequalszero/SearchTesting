// class for creating the appropriate transform for an axis label.
// Takes the axis label text node, the axis node, and a props object.
// The props object should have keys:
//    axisType,
//    translateX,
//    translateY,
//    axisLength
// Optional keys:
//    axisLabelRotation (default 0),
//    axisLabelPosition (default "middle"),
//    axisLabelExtraPadding (default 20)
class AxisLabelHelper {
  constructor(textNode, axisNode, props) {
    this.textNode = textNode;
    this.axisNode = axisNode;
    this.props = props;
    this.labelPositioning = props.axisLabelPosition || "middle";
    this.extraPadding = props.axisLabelExtraPadding || 20;
    this.verticalMultiplier = {
      left: 1,
      bottom: -1,
      right: 1,
      top: -1
    }[props.axisType];
    this.horizontalMultiplier = this.verticalMultiplier === 1 ? 0 : 1;
  }

  // Helper function for #createTranslationObject method.
  heightTranslateHelper() {
    switch(this.labelPositioning) {
      case "middle":
        return this.props.axisLength/2 + (this.verticalMultiplier * this.textNode.getBBox().width/2);
      case "beginning":
        return (Math.max(0, this.verticalMultiplier) * this.props.axisLength) + (Math.min(0, this.horizontalMultiplier) * this.textNode.getBBox().width);
      case "end":
        return (this.horizontalMultiplier * this.props.axisLength) + (this.verticalMultiplier * this.textNode.getBBox().width);
      default:
        throw `Error Axis#heightTranslateHelper: no case for labelPositioning: '${labelPositioning}'`
    }
  }

  // Returns the translateX and translateY numbers required for properly aligning the
  // axis label based on the axisType and labelPositioning props.
  createTranslationObject() {
    switch(this.props.axisType) {
      case "left":
        return {
          translateX: this.props.translateX - this.axisNode.getBBox().width - this.extraPadding,
          translateY: this.props.translateY + this.heightTranslateHelper(this.props.labelPositioning)
        };
      case "bottom":
        return {
          translateX: this.props.translateX + this.heightTranslateHelper(this.props.labelPositioning),
          translateY: this.props.translateY + this.axisNode.getBBox().height + this.extraPadding,
        };
      default:
        throw `Error in Axis#positionHelper: no case for axisType: ${this.props.axisType}`;
    }
  }

  // Creates a transformObject comprised of a translation and rotation.
  createAxisLabelTransformObject() {
    const translationObject = this.createTranslationObject();
    const transformObject = {
      translateX: translationObject.translateX,
      translateY: translationObject.translateY,
      rotation: this.props.axisLabelRotation || 0
    };
    return transformObject;
  }

  // Takes an object with translateX, translateY, and rotation keys.
  // Returns a translate(x, y) rotate(deg) string that can be passed as a transform.
  formatTransform({translateX, translateY, rotation}) {
    return `translate(${translateX}, ${translateY}) rotate(${rotation})`;
  }

  // Creates a transform object.
  createAxisLabelTransform() {
    if (!this.textNode || !this.axisNode) {
      return `translate(0, 0)`;
    }

    const transformObject = this.createAxisLabelTransformObject();
    return this.formatTransform(transformObject);
  }
}

// Takes the axis label text node, the axis node, and a props object.
// The props object should have keys:
//    axisType,
//    translateX,
//    translateY,
//    axisLength
// Optional keys:
//    axisLabelRotation (default 0),
//    axisLabelPosition (default "middle"),
//    axisLabelExtraPadding (default 20)
// Returns a translate(x, y) rotate(r) string that can be passed as a transform.
export const createAxisLabelTransform = (textNode, axisNode, props) => {
  const axisLabelHelper = new AxisLabelHelper(textNode, axisNode, props);
  return axisLabelHelper.createAxisLabelTransform();
}
