"use strict";

import { DISPLAY_VIEW } from "../../../constants/actionTypes";

function displayedView(state = [], action) {
  switch (action.type) {
    case DISPLAY_VIEW:
      return action.viewName;
    default:
      return state;
  }
}

export default displayedView;