"use strict";

import {
  ADD_REMINDER,
  DELETE_REMINDER,
  TOGGLE_REMINDER,
  EDIT_REMINDER,
  DATA_LOADED,
  REMINDERS_UNDO,
  REMINDERS_REDO
} from "../../../constants/actionTypes";

import undoable, {
  includeAction
} from "redux-undo";

function reminders(state = [], action) {
  switch (action.type) {
    case DATA_LOADED:
      return action.data.reminders.sort(sortByDate);
    case ADD_REMINDER:
      return [...state, action.newReminder].sort(sortByDate);
    case DELETE_REMINDER:
      return state.filter(reminder => reminder.id !== action.id);
    case TOGGLE_REMINDER:
      return state.map(reminder => {
        if (reminder.id === action.id) {
          return Object.assign({}, reminder, {
            done: !reminder.done
          });
        }
        return reminder;
      });
    case EDIT_REMINDER:
      return state
        .map(reminder => {
          if (reminder.id === action.editedReminder.id) {
            return Object.assign({}, reminder, action.editedReminder);
          }
          return reminder;
        })
        .sort(sortByDate);
    default:
      return state;
  }
}

function sortByDate(reminderA, reminderB) {
  return new Date(reminderB.dueDate) - new Date(reminderA.dueDate);
}

export const undoableReminders = undoable(reminders, {
  filter: includeAction([
    ADD_REMINDER,
    DELETE_REMINDER,
    TOGGLE_REMINDER,
    EDIT_REMINDER
  ]),
  undoType: REMINDERS_UNDO,
  redoType: REMINDERS_REDO,
  syncFilter: true // Set to true in order to not have an empty object in past after the first action
});