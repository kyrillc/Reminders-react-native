"use strict";

import React from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { Icon } from "react-native-elements";
import styles from "./styles";

const SettingsBarButton = props => (
  <View style={styles.navBarView}>
    <Icon name="settings" type="feather" onPress={props.leftButtonCallback} />
  </View>
);

SettingsBarButton.propTypes = {
  leftButtonCallback: PropTypes.func
};

export default SettingsBarButton;
