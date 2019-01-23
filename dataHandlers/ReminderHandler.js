"use strict";
import { addReminder, editReminder, toggleReminder, deleteReminder } from "../config/redux/actions";
import store from "../config/redux/store";
import NotificationService from "../config/NotificationService";
import GeoFencingService from "../config/GeoFencingService";
import DataHandler from "./DataHandler";

export default class ReminderHandler {

  static addReminder(newReminder) {
    store.dispatch(addReminder(newReminder));
    this.activateReminder(newReminder);
  }

  static editReminder(editedReminder) {
    const reminder = DataHandler.reminderForId(editedReminder.id); 
    this.deactivateReminder(reminder); // Deactivate the previously saved reminder
    this.activateReminder(editedReminder); // Activate the edited reminder
    store.dispatch(editReminder(editedReminder));
  }

  static deleteReminder(reminder) {
    this.deactivateReminder(reminder);
    store.dispatch(deleteReminder(reminder.id));
  }

  static toggleReminder(reminder) {
    if (!reminder.done) {
      this.deactivateReminder(reminder);
    } else {
      this.activateReminder(reminder);
    }
    store.dispatch(toggleReminder(reminder.id));
  }

  static async resetRemindersForLocation(locationId){
    const reminders = DataHandler.remindersForLocationId(locationId);
    await this.resetReminders(reminders);
  }

  static async resetReminders(reminders){
    for (const reminder of reminders) {
      await this.resetReminder(reminder);
    }
  }

  static async resetReminder(reminder){
    await this.deactivateReminder(reminder);
    await this.activateReminder(reminder);
  }

  static async activateReminder(reminder){
    if (reminder.dueDate){
      NotificationService.addScheduledNotificationFromReminder(reminder);
    }
    if (reminder.locationId) {
      await GeoFencingService.addGeofenceFromReminder(reminder);
    }
  }

  static async deactivateReminder(reminder){
    if (reminder.dueDate){
      NotificationService.deleteNotification(reminder.id);
    }
    if (reminder.locationId) {
      await GeoFencingService.removeGeofence(reminder.id);
    }
  }

  static reminderIsOverdue(reminder){
    return (reminder.dueDate && new Date(reminder.dueDate) < new Date());
  }
}
