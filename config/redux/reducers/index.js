"use strict";

import { combineReducers } from 'redux';
import dataState from "./data";
import {undoableReminders as reminders} from "./reminders";
import {undoableLocations as locations} from "./locations";
import displayedView from "./displayedView";

const remindersApp = combineReducers({
    dataState,
    reminders,
    locations,
    displayedView,
});
export default remindersApp;