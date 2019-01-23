"use strict";

import NotificationService from "./NotificationService";
import GeoFencingService from "./GeoFencingService";
import { AppState, Alert } from "react-native";
import DataHandler from "../dataHandlers/DataHandler";

export default class Services {
  static async configureServices() {
    await GeoFencingService.configureGeofencingService(
      Services.onGeofence.bind(this)
    );
    NotificationService.configureNotificationService(
      Services.handleNotification.bind(this)
    );
  }

  static async setupRemindersFromLoadedData(shouldSetupNotifications, shouldSetupGeofences) {
    if (shouldSetupNotifications){
      NotificationService.initNotificationsFromReminders(
        DataHandler.loadedReminders()
      );  
    }
    if (shouldSetupGeofences){
      await GeoFencingService.initGeofencesFromReminders(DataHandler.loadedReminders());
    }
  }

  static onGeofence(geofence) {
    console.log("[geofence] ", geofence.identifier, geofence.action);
    const reminder = DataHandler.reminderForId(geofence.identifier);
    if (reminder && AppState.currentState.match(/inactive|background/)) {
      NotificationService.showNotificationFromReminder(reminder);
    }
  }

  static handleNotification(notification) {
    console.log(notification);
    Alert.alert(notification.title, notification.message);
  }
}
