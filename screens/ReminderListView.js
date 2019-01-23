"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";

import ReminderHandler from "../dataHandlers/ReminderHandler";

import { NEW_ITEM_ROW } from "../constants/rowTypes";
import { EDITION_VIEW_MODE } from "../constants/editionMode";
import { routeNames } from "../constants/routeNames";

import ListView from "../components/ListView";
import ReminderCell from "../components/ReminderCell";
import ActionCell from "../components/ActionCell";
import { ReminderListNavigationOptions } from "../components/NavigationBar/NavigationOptions";

import NavigationScreen from "./NavigationScreen";

class ReminderListView extends Component {
  static navigationOptions = ({ navigation }) => {
    return ReminderListNavigationOptions(() =>
      navigation.navigate("SettingsView")
    );
  };

  constructor(props) {
    super(props);

    this.actionRowsCount = 1; // "New reminder" row

    this.newReminderRow = {
      title: "New reminder...",
      rowType: NEW_ITEM_ROW,
      done: false
    };
  }

  _listData() {
    return [this.newReminderRow].concat(this.props.reminders);
  }

  _onListItemPressed(index) {
    if (this._listData()[index].rowType == NEW_ITEM_ROW) {
      this.props.navigation.navigate(routeNames.ReminderEditionView, {
        editionMode: EDITION_VIEW_MODE.NEW
      });
    } else {
      const reminderIndex = index - this.actionRowsCount;
      ReminderHandler.toggleReminder(this.props.reminders[reminderIndex]);
    }
  }

  _onEditReminder(reminder) {
    this.props.navigation.navigate(routeNames.ReminderEditionView, {
      editionMode: EDITION_VIEW_MODE.EDIT,
      reminder: reminder
    });
  }

  _renderItem = ({ item, index }) => {
    var cell = <View />;
    if (this._listData()[index].rowType == NEW_ITEM_ROW) {
      cell = (
        <ActionCell
          title={item.title}
          rowType={item.rowType}
          onPress={() => this._onListItemPressed(index)}
        />
      );
    } else {
      const reminderIndex = index - this.actionRowsCount;
      cell = (
        <ReminderCell
          reminder={item}
          onToggle={() => this._onListItemPressed(index)}
          onDelete={() =>
            ReminderHandler.deleteReminder(this.props.reminders[reminderIndex])
          }
          onEdit={() =>
            this._onEditReminder(this.props.reminders[reminderIndex])
          }
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

const mapStateToProps = state => {
  return {
    reminders: state.reminders.present
  };
};

export default connect(
  mapStateToProps,
  null
)(ReminderListView);

export const ViewName = "ReminderListView";
