"use strict";

import React, { Component } from "react";
import { View } from "react-native";

import { routeNames } from "../constants/routeNames";
import { NAVIGATION_ROW } from "../constants/rowTypes";

import { DefaultModalNavigationOptions } from "../components/NavigationBar/NavigationOptions";
import ListView from "../components/ListView";
import ActionCell from "../components/ActionCell";

import NavigationScreen from "./NavigationScreen";

export default class SettingsView extends Component {
  static navigationOptions = ({ navigation }) => {
    return DefaultModalNavigationOptions("Settings", () =>
      navigation.navigate(routeNames.ReminderListView)
    );
  };

  constructor(props) {
    super(props);
    this.rows = { savedLocations: "Manage locations" };
  }

  _listData() {
    return [{ rowType: NAVIGATION_ROW, title: this.rows.savedLocations }];
  }

  _onListItemPressed(index) {
    if (this._listData()[index].title == this.rows.savedLocations) {
      const { navigation } = this.props;
      navigation.navigate(routeNames.LocationListView);
    }
  }

  _renderItem = ({ item, index }) => {
    var cell = <View />;
    if (this._listData()[index].rowType == NAVIGATION_ROW) {
      cell = (
        <ActionCell
          title={item.title}
          rowType={item.rowType}
          onPress={() => this._onListItemPressed(index)}
        />
      );
    }
    return cell;
  };

  render() {
    return (
      <NavigationScreen navigation={this.props.navigation}>
        <ListView listData={this._listData()} renderItem={this._renderItem} />
      </NavigationScreen>
    );
  }
}
