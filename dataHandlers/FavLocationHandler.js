"use strict";
import ReminderHandler from "./ReminderHandler";
import DataHandler from "./DataHandler";
import { addLocation, editLocation, deleteLocation } from "../config/redux/actions";
import store from "../config/redux/store";

export default class FavLocationHandler {
  static reminderCountStringForLocationId(locationId) {
    const count = DataHandler.remindersForLocationId(locationId).length;
    const reminderString = count < 2 ? "reminder" : "reminders";
    return {
      remindersCount: count,
      string: "(" + count + " " + reminderString + ")"
    };
  }

  static resetRemindersForLocation(locationId) {
    const reminders = DataHandler.remindersForLocationId(locationId);
    ReminderHandler.resetReminders(reminders);
  }

  static addLocation(newLocation) {
    store.dispatch(addLocation(newLocation));
  }

  static editLocation(editedLocation) {
    store.dispatch(editLocation(editedLocation));
    this.resetRemindersForLocation(editedLocation.id);
  }

  static deleteLocation(locationId) {
    store.dispatch(deleteLocation(locationId));
  }
}
