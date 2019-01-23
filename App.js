"use strict";

import React, { Component } from "react";
import { AppState } from "react-native";
import { Provider } from "react-redux";

import store from "./config/redux/store";
import { NavigationStack } from "./screens/NavigationStack";

import {
  fetchDataLocally,
  saveDataLocally
} from "./config/redux/actions";
import Services from "./config/Services";
import { ActionCreators } from "redux-undo";

export default class App extends Component {
  async componentDidMount() {
    AppState.addEventListener("change", this._handleAppStateChange);

    // Configure the services before setting up the reminders (geofences+notifications)
    await Services.configureServices();

    store.dispatch(fetchDataLocally()).then(() => {
      Services.setupRemindersFromLoadedData(true, true);
    });
    store.dispatch(ActionCreators.clearHistory());
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }
  _handleAppStateChange = nextAppState => {
    if (nextAppState === "background") {
      console.log("App enters background");
      store.dispatch(saveDataLocally()).then(() => {
        console.log("Did save data");
      });
    }
  };

  render() {
    return (
      <Provider store={store}>
        <NavigationStack />
      </Provider>
    );
  }
}
