import React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

export default (styles = StyleSheet.create({
  newItemText: {
    padding: 10,
    marginLeft: 6,
    fontSize: 18,
    fontWeight: "bold",
    height: 44
  }
}));

export const plusIcon = <Icon name="md-add" type="ionicon" />;
