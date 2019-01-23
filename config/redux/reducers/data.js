"use strict";
import {
  SAVE_DATA,
  LOAD_DATA,
  DATA_LOADED,
  DATA_SAVED
} from "../../../constants/actionTypes";


function dataState(
  state = {
    isFetching: false,
    isSaving: false,
    savedAt: null,
    loadedAt: null,
    dataSource: null,
    dataSaveLocation: null
  },
  action
) {
  switch (action.type) {
    case LOAD_DATA:
    return Object.assign({}, state, {
      isFetching: true,
      dataSource: action.dataLocation
    });
    case DATA_LOADED:
      return Object.assign({}, state, {
        isFetching: false,
        loadedAt: action.loadedAt
      });
    case SAVE_DATA:
      return Object.assign({}, state, {
        isSaving: true,
        dataSaveLocation: action.dataLocation
      });
    case DATA_SAVED:
      return Object.assign({}, state, {
        isSaving: false,
        savedAt: action.savedAt
      });
    default:
      return state;
  }
}

export default dataState;
