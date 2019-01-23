"use strict";

import BackgroundGeolocation from "react-native-background-geolocation";
import { GEOFENCE_OPTIONS } from "../constants/geofenceOptions";
import DataHandler from "../dataHandlers/DataHandler";

export default class GeoFencingService {
  static async configureGeofencingService(onGeofence) {
    // Listen for geofence events.
    BackgroundGeolocation.onGeofence(geofence => onGeofence(geofence));

    // Setup BackgroundGeolocation
    const state = await BackgroundGeolocation.ready({
      // Geolocation Config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      geofenceInitialTriggerEntry: false,
      distanceFilter: 20,
      stopTimeout: 1,
      debug: false, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_OFF,
      stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true // <-- Auto start tracking when device is powered-up.
    });

    if (!state.enabled) {
      BackgroundGeolocation.startGeofences();
    }
  }

  static async initGeofencesFromReminders(reminders) {
    await BackgroundGeolocation.removeGeofences();
    await this.addGeofencesFromReminders(reminders);
  }

  static async addGeofenceFromReminder(reminder) {
    try {
      await BackgroundGeolocation.addGeofence(
        this.geofenceFromReminder(reminder)
      );
    } catch (error) {
      console.log("[addGeofence] FAILURE: ", error);
    }
  }

  static async addGeofencesFromReminders(reminders) {
    reminders = reminders.filter(
      reminder => !reminder.done && reminder.locationId != null
    );
    if (!reminders || reminders.length == 0) {
      return;
    }
    const geofences = reminders.map(reminder => {
      return this.geofenceFromReminder(reminder);
    });
    try {
      await BackgroundGeolocation.addGeofences(geofences);
    } catch (error) {
      console.log("[addGeofences] catch error:" + error);
    }
  }

  static async removeGeofence(reminderId) {
    try {
      await BackgroundGeolocation.removeGeofence(reminderId);
    } catch (error) {
      console.log("[removeGeofence] FAILURE: ", error);
    }
  }

  static removeListeners() {
    BackgroundGeolocation.removeListeners();
  }

  static geofenceFromReminder(reminder) {
    const location = DataHandler.locationForId(reminder.locationId);

    return {
      identifier: reminder.id,
      radius: location.radius,
      latitude: location.latitude,
      longitude: location.longitude,
      notifyOnEntry: reminder.geofenceOption == GEOFENCE_OPTIONS.WHEN_ARRIVING,
      notifyOnExit: reminder.geofenceOption == GEOFENCE_OPTIONS.WHEN_LEAVING
    };
  }
}
