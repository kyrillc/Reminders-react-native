"use strict";

import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import DateTimePicker from "react-native-modal-datetime-picker";
import DateTimeUtilities from "../utilities/DateTimeUtilities";

export default class DueDateTimePickerButton extends Component {
  state = {
    isDateTimePickerVisible: false,
    date: this.props.defaultDate
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.setState({ date: date });
    this.props.onDateChanged(date);
    this._hideDateTimePicker();
  };

  render() {
    const labelText = this.props.dateIsEnabled
      ? DateTimeUtilities.formattedDateTimeString(this.state.date)
      : this.props.placeholder;
    return (
      <View>
        <TouchableOpacity
          onPress={this._showDateTimePicker}
        >
          <Text>{labelText}</Text>
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="datetime"
          minuteInterval={5}
          date={this.state.date}
          is24Hour={true}
        />
      </View>
    );
  }

  static propTypes = {
    defaultDate: PropTypes.object.isRequired,
    dateIsEnabled: PropTypes.bool.isRequired,
    placeholder: PropTypes.string.isRequired,
    onDateChanged: PropTypes.func
  };
}
