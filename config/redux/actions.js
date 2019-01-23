"use strict";

import { AsyncStorage } from "react-native";
import remindersData from "../../data/reminders.json";
import * as actionTypes from "../../constants/actionTypes";
import { REMINDER_ROW } from "../../constants/rowTypes";

export const DataLocations = {
  LOCAL_FILE: "LOCAL_FILE",
  LOCAL_ASYNC_STORAGE: "LOCAL_ASYNC_STORAGE"
};

function loadData(dataLocation) {
  return { type: actionTypes.LOAD_DATA, dataLocation };
}

function dataLoaded(data) {
  return { type: actionTypes.DATA_LOADED, data, loadedAt: Date.now() };
}

export function fetchDataLocally() {
  return function(dispatch) {
    dispatch(loadData(DataLocations.LOCAL_ASYNC_STORAGE));
    return AsyncStorage.getItem("@Reminders:remindersData")
      .then(
        response => JSON.parse(response),
        error => console.log("An error occurred.", error)
      )
      .then(response => {
        if (response) {
          dispatch(dataLoaded(response));
        } else {
          dispatch(loadData(DataLocations.LOCAL_FILE));
          let defaultRemindersData = remindersData.reminders.map(reminder => {
            return {
              id: reminder.id,
              title: reminder.title,
              rowType: REMINDER_ROW,
              dueDate: reminder.dueDate,
              done: reminder.done
            };
          });
          let defaultLocationsData = remindersData.locations.map(location => {
            return {
              id: location.id,
              name: location.name,
              latitude: location.location,
              longitude: location.longitude,
              radius: location.radius
            };
          });
          let loadedData = {
            reminders: defaultRemindersData,
            locations: defaultLocationsData
          };
          dispatch(dataLoaded(loadedData));
        }
      });
  };
}

function saveData(dataLocation) {
  return { type: actionTypes.SAVE_DATA, dataLocation };
}

function dataSaved() {
  return { type: actionTypes.DATA_SAVED, savedAt: Date.now() };
}

export function saveDataLocally() {
  return function(dispatch, getState) {
    dispatch(saveData(DataLocations.LOCAL_ASYNC_STORAGE));
    let remindersData = getState().reminders.present;
    let locationsData = getState().locations.present;
    let data = { reminders: remindersData, locations: locationsData };
    return AsyncStorage.setItem(
      "@Reminders:remindersData",
      JSON.stringify(data)
    ).then(() => {
      dispatch(dataSaved());
    });
  };
}

export function addReminder(newReminder) {
  return { type: actionTypes.ADD_REMINDER, newReminder };
}

export function deleteReminder(id) {
  return { type: actionTypes.DELETE_REMINDER, id };
}

export function toggleReminder(id) {
  return { type: actionTypes.TOGGLE_REMINDER, id };
}

export function editReminder(editedReminder) {
  return { type: actionTypes.EDIT_REMINDER, editedReminder };
}

export function undoReminders() {
  return { type: actionTypes.REMINDERS_UNDO, data: null };
}

export function redoReminders() {
  return { type: actionTypes.REMINDERS_REDO };
}

export function addLocation(newLocation) {
  return { type: actionTypes.ADD_FAV_LOCATION, newLocation };
}

export function editLocation(editedLocation) {
  return { type: actionTypes.EDIT_FAV_LOCATION, editedLocation };
}

export function deleteLocation(id) {
  return { type: actionTypes.DELETE_FAV_LOCATION, id };
}

export function undoLocations() {
  return { type: actionTypes.FAV_LOCATIONS_UNDO };
}

export function redoLocations() {
  return { type: actionTypes.FAV_LOCATIONS_REDO };
}

export function displayView(viewName) {
  return { type: actionTypes.DISPLAY_VIEW, viewName };
}
