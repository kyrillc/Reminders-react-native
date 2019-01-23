"use strict";

import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  Button,
  FormLabel,
  FormInput,
  ButtonGroup
} from "react-native-elements";
import uuidv4 from "uuid/v4";

import { REMINDER_ROW } from "../constants/rowTypes";
import { GEOFENCE_OPTIONS } from "../constants/geofenceOptions";
import { EDITION_VIEW_MODE } from "../constants/editionMode";
import { routeNames } from "../constants/routeNames";

import NotificationService from "../config/NotificationService";
import ReminderHandler from "../dataHandlers/ReminderHandler";
import DataHandler from "../dataHandlers/DataHandler";
import DateTimeUtilities from "../utilities/DateTimeUtilities";

import DueDateTimePickerButton from "../components/DueDateTimePickerButton";
import DiscardButton from "../components/DiscardButton";
import { DefaultModalNavigationOptions } from "../components/NavigationBar/NavigationOptions";

import NavigationScreen from "./NavigationScreen";

export default class ReminderEditionView extends Component {
  static navigationOptions = ({ navigation }) => {
    const editionMode = navigation.getParam("editionMode");

    if (editionMode == EDITION_VIEW_MODE.NEW) {
      return DefaultModalNavigationOptions("New reminder", () =>
        navigation.navigate(routeNames.ReminderListView)
      );
    } else if (editionMode == EDITION_VIEW_MODE.EDIT) {
      return DefaultModalNavigationOptions("Edit reminder", () =>
        navigation.navigate(routeNames.ReminderListView)
      );
    }
  };

  constructor(props) {
    super(props);

    this.editionMode = this.props.navigation.getParam("editionMode");

    if (this.editionMode == EDITION_VIEW_MODE.NEW) {
      this.state = {
        title: "",
        dueDate: null,
        entryIsValid: false,
        dateIsEnabled: false,
        locationId: null,
        selectedGeofenceOption: GEOFENCE_OPTIONS.WHEN_ARRIVING
      };
    } else if (this.editionMode == EDITION_VIEW_MODE.EDIT) {
      this.loadedReminder = this.props.navigation.getParam("reminder");
      this.state = {
        title: this.loadedReminder.title,
        dueDate: this.loadedReminder.dueDate,
        entryIsValid: true,
        dateIsEnabled: this.loadedReminder.dueDate ? true : false,
        locationId: this.loadedReminder.locationId,
        selectedGeofenceOption: this.loadedReminder.geofenceOption
      };
    }

    NotificationService.checkNotificationServicePermission();
  }

  onDatePicked = date => {
    this.setState({
      dueDate: date,
      dateIsEnabled: true
    });
  };

  onLocationSelected = location => {
    this.setState({ locationId: location.id });
  };

  onSelectedGeofenceOptionChanged = index => {
    this.setState({ selectedGeofenceOption: index });
  };

  onTitleChanged = title => {
    this.setState({ title: title, entryIsValid: title.length > 0 });
  };

  onSave = () => {
    if (this.editionMode == EDITION_VIEW_MODE.NEW) {
      const newReminder = {
        id: uuidv4(),
        title: this.state.title,
        rowType: REMINDER_ROW,
        dueDate: this.state.dueDate,
        locationId: this.state.locationId,
        geofenceOption: this.state.locationId ? this.state.selectedGeofenceOption : 0,
        done: false
      };
      ReminderHandler.addReminder(newReminder);
    } else if (this.editionMode == EDITION_VIEW_MODE.EDIT) {
      const editedReminder = {
        id: this.loadedReminder.id,
        title: this.state.title,
        rowType: REMINDER_ROW,
        dueDate: this.state.dueDate,
        locationId: this.state.locationId,
        geofenceOption: this.state.locationId ? this.state.selectedGeofenceOption : 0,
        done: this.loadedReminder.done
      };
      ReminderHandler.editReminder(editedReminder);
    }
    this.props.navigation.navigate(routeNames.ReminderListView);
  };

  render() {
    var locationTxt = "Select a location";
    if (this.state.locationId) {
      const location = DataHandler.locationForId(this.state.locationId);
      locationTxt = location.name;
    }
    const buttons = ["When arriving", "When leaving"];
    const { selectedGeofenceOption } = this.state;
    const geofenceOptions = this.state.locationId ? (
      <ButtonGroup
        onPress={this.onSelectedGeofenceOptionChanged}
        selectedIndex={selectedGeofenceOption}
        buttons={buttons}
        containerStyle={styles.geofenceOptions}
        selectedTextStyle={styles.selectedGeofenceOptionText}
      />
    ) : null;

    return (
      <NavigationScreen navigation={this.props.navigation}>
        <FormLabel>Title</FormLabel>
        <FormInput
          placeholder="Reminder"
          value={this.state.title}
          onChangeText={this.onTitleChanged.bind(this)}
          returnKeyType="done"
        />
        <FormLabel>Remind me on date:</FormLabel>
        <View style={styles.optionRows}>
          <DueDateTimePickerButton
            onDateChanged={this.onDatePicked.bind(this)}
            defaultDate={
              this.state.dueDate
                ? new Date(this.state.dueDate)
                : DateTimeUtilities.nearFutureDate()
            }
            placeholder="Select a date"
            dateIsEnabled={this.state.dateIsEnabled}
          />
          <DiscardButton
            enabled={this.state.dateIsEnabled}
            onPress={() => {
              this.setState({ dateIsEnabled: false, dueDate: null });
            }}
          />
        </View>

        <FormLabel>Remind me on location:</FormLabel>
        <View style={styles.optionRows}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate(routeNames.LocationListView, {
                onLocationSelected: this.onLocationSelected.bind(this)
              });
            }}
          >
            <Text>{locationTxt}</Text>
          </TouchableOpacity>
          <DiscardButton
            enabled={this.state.locationId}
            onPress={() => {
              this.setState({ locationId: null });
            }}
          />
        </View>
        {geofenceOptions}

        <Button
          style={styles.saveButton}
          title="Save"
          onPress={this.onSave}
          disabled={!this.state.entryIsValid}
          backgroundColor="#71a3f2"
        />
      </NavigationScreen>
    );
  }
}

const styles = StyleSheet.create({
  saveButton: { marginTop: 20 },
  optionRows: {
    marginLeft: 20,
    marginBottom: 20,
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  geofenceOptions: {
    marginLeft: 20,
    marginBottom: 20,
    marginRight: 20,
    height: 40
  },
  selectedGeofenceOptionText: {
    fontSize: 17,
    fontWeight: "bold"
  }
});
