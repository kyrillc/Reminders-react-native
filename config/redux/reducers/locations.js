"use strict";

import {
  ADD_FAV_LOCATION,
  DELETE_FAV_LOCATION,
  EDIT_FAV_LOCATION,
  DATA_LOADED,
  FAV_LOCATIONS_UNDO,
  FAV_LOCATIONS_REDO
} from "../../../constants/actionTypes";
import undoable, { includeAction } from "redux-undo";

function locations(state = [], action) {
  switch (action.type) {
    case DATA_LOADED:
      return action.data.locations.sort(sortByName);
    case ADD_FAV_LOCATION:
      return [...state, action.newLocation].sort(sortByName);
    case EDIT_FAV_LOCATION:
      return state
        .map(location => {
          if (location.id === action.editedLocation.id) {
            return Object.assign({}, location, action.editedLocation);
          }
          return location;
        })
        .sort(sortByName);
    case DELETE_FAV_LOCATION:
      return state.filter(location => location.id !== action.id);
    default:
      return state;
  }
}

function sortByName(locationA, locationB) {
  if (locationA.name.toLowerCase() < locationB.name.toLowerCase())
    //sort string ascending
    return -1;
  else if (locationA.name.toLowerCase() > locationB.name.toLowerCase())
    return 1;
  return 0;
}

export const undoableLocations = undoable(locations, {
  filter: includeAction([
    ADD_FAV_LOCATION,
    DELETE_FAV_LOCATION,
    EDIT_FAV_LOCATION
  ]),
  undoType: FAV_LOCATIONS_UNDO,
  redoType: FAV_LOCATIONS_REDO,
  syncFilter: true // Set to true in order to not have an empty object in past after the first action
});
