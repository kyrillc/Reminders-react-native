"use strict";

import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { displayView } from "../config/redux/actions";

class NavigationScreen extends Component {
  componentWillMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      payload => {
        this.props.onViewDisplayed(payload.state.routeName);
      }
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  render() {
    return <View style={{ flexGrow: 1 }}>{this.props.children}</View>;
  }
}

NavigationScreen.propTypes = {
  navigation: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
  onViewDisplayed: viewName => dispatch(displayView(viewName))
});

export default connect(
  null,
  mapDispatchToProps
)(NavigationScreen);
