"use strict";

import React from "react";
import { Icon } from "react-native-elements";
import PropTypes from "prop-types";
import styles from "./styles";

const DiscardButton = props => {
  return props.enabled ? (
    <Icon
      style={styles.discardButton}
      name="md-close"
      type="ionicon"
      onPress={props.onPress}
      backgroundColor="red"
    />
  ) : null;
};
DiscardButton.propTypes = {
  onPress: PropTypes.func
};
export default DiscardButton;
