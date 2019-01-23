"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { Icon } from "react-native-elements";

import { routeNames } from "../../constants/routeNames";

import styles from "./styles";

import store from "../../config/redux/store";
import Services from "../../config/Services";

import {
  undoReminders,
  redoReminders,
  undoLocations,
  redoLocations
} from "../../config/redux/actions";

class UndoBarButtons extends Component {
  render() {
    return (
      <View style={styles.navBarView}>
        <Icon
          disabled={!this.props.canUndo}
          containerStyle={
            this.props.canUndo
              ? styles.navBarButton
              : styles.navBarButtonDisabled
          }
          name="md-undo"
          type="ionicon"
          onPress={this.undo.bind(this)}
        />
        <Icon
          disabled={!this.props.canRedo}
          containerStyle={
            this.props.canRedo
              ? styles.navBarButton
              : styles.navBarButtonDisabled
          }
          name="md-redo"
          type="ionicon"
          onPress={this.redo.bind(this)}
        />
      </View>
    );
  }

  undo() {
    if (this.props.displayedView == routeNames.LocationListView) {
      store.dispatch(undoLocations());
      this.didChangeLocationState();
    } else {
      store.dispatch(undoReminders());
      this.didChangeReminderState();
    }
  }

  redo() {
    if (this.props.displayedView == routeNames.LocationListView) {
      store.dispatch(redoLocations());
      this.didChangeLocationState();
    } else {
      store.dispatch(redoReminders());
      this.didChangeReminderState();
    }
  }

  didChangeLocationState() {
    // Geofences can be affected by changes: reset them
    Services.setupRemindersFromLoadedData(false, true);
  }
  didChangeReminderState() {
    // Notifications & Geofences can be affected by changes: reset them
    Services.setupRemindersFromLoadedData(true, true);
  }
}

const mapStateToProps = state => {
  const undoableStateSlice =
    state.displayedView == routeNames.LocationListView
      ? state.locations
      : state.reminders;
  const canUndo = undoableStateSlice.past && undoableStateSlice.past.length > 0;
  const canRedo =
    undoableStateSlice.future && undoableStateSlice.future.length > 0;

  return {
    displayedView: state.displayedView,
    canUndo: canUndo,
    canRedo: canRedo
  };
};

export default connect(
  mapStateToProps,
  null
)(UndoBarButtons);
