"use strict";

import store from "../config/redux/store";

export default class DataHandler {
  static loadedReminders(){
    return store.getState().reminders.present;
  }
  static loadedLocations(){
    return store.getState().locations.present;
  }
  static reminderForId(reminderId) {
    return this.loadedReminders().find(x => x.id === reminderId);
  }
  static locationForId(locationId) {
    return this.loadedLocations().find(x => x.id === locationId);
  }
  static remindersForLocationId(locationId) {
    return this.loadedReminders().filter(x => x.locationId === locationId);
  }
}
