"use strict";

import { StyleSheet } from "react-native";

const navBarButtonMargins = {
  marginRight: 5,
  marginLeft: 5
};

export default (styles = StyleSheet.create({
  navBarView: {
    marginLeft: 15,
    marginRight: 15,
    flexDirection: "row"
  },
  navBarButton: {
    opacity: 1.0,
    ...navBarButtonMargins
  },
  navBarButtonDisabled: {
    opacity: 0.3,
    ...navBarButtonMargins
  }
}));
