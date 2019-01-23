"use strict";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";

import remindersApp from "./reducers";

const loggerMiddleware = createLogger();

const store = createStore(
  remindersApp,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // logs actions
  )
);

export default store;
