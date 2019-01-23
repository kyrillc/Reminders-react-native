"use strict";

import React from "react";
import PropTypes from "prop-types";
import styles, { checkedicon, uncheckedicon } from "./styles";
import ListCell from "../ListCell";
import DateTimeUtilities from "../../utilities/DateTimeUtilities";
import ReminderHandler from "../../dataHandlers/ReminderHandler";
import DataHandler from "../../dataHandlers/DataHandler";

function subtitleForReminder(reminder) {
  var dateText = null;
  var locationText = null;
  var subtitle = null;
  if (reminder.dueDate) {
    dateText = DateTimeUtilities.formattedDateTimeString(reminder.dueDate);
  }
  if (reminder.locationId) {
    const location = DataHandler.locationForId(reminder.locationId);
    if (location){
      locationText = location.name;
    }
  }
  if (dateText && locationText) {
    subtitle = dateText + " - " + locationText;
  }
  else if (dateText) {
    subtitle = dateText;
  }
  else if (locationText) {
    subtitle = locationText;
  }
  return subtitle;
}

const ReminderCell = props => (
  <ListCell
    leftIcon={props.reminder.done ? checkedicon : uncheckedicon}
    hideChevron={true}
    title={props.reminder.title}
    subtitle={subtitleForReminder(props.reminder)}
    subtitleStyle={
      (ReminderHandler.reminderIsOverdue(props.reminder) && !props.reminder.done)
        ? styles.overdueDateText
        : styles.dueDateText
    }
    titleStyle={props.reminder.done ? styles.doneItemText : styles.todoItemText}
    onPress={props.onToggle}
    onDelete={props.onDelete}
    onEdit={props.onEdit}
    swipeable={true}
  />
);
ReminderCell.propTypes = {
  reminder: PropTypes.object,
  onToggle: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};
ReminderCell.defaultProps = {
  reminder: {
    id: "00000000-0000-0000-0000-000000000000",
    title: "Do laundry",
    dueDate: "2019-11-15",
    done: true
  }
};

export default ReminderCell;
