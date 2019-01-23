"use strict";

import React from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const Circle = props => {
  var circleSize = StyleSheet.create({
    circleSize: {
      width: props.diameter,
      borderRadius: props.diameter / 2
    }
  });
  const circleCombinedStyles = StyleSheet.flatten([
    styles.circle,
    circleSize.circleSize
  ]);
  return <View style={circleCombinedStyles} pointerEvents={"none"} />;
};
Circle.propTypes = {
  diameter: PropTypes.number.isRequired
};
export default Circle;

const styles = StyleSheet.create({
  circle: {
    aspectRatio: 1,
    backgroundColor: "red",
    opacity: 0.3
  }
});
