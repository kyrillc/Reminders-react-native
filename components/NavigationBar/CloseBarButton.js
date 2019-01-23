"use strict";

import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { Icon } from "react-native-elements";
import styles from "./styles";

const CloseBarButton = props => (
  <View style={styles.navBarView}>
    <Icon name="md-close" type="ionicon" onPress={props.onPress} />
  </View>
);

CloseBarButton.propTypes = {
  onPress: PropTypes.func
};

export default CloseBarButton;
