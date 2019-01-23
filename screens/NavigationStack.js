"use strict";

import { createStackNavigator, createAppContainer } from "react-navigation";

import { routeNames } from "../constants/routeNames";

import ReminderEditionView from "./ReminderEditionView";
import SettingsView from "./SettingsView";
import ReminderListView from "./ReminderListView";
import NewFavLocationView from "./NewFavLocationView";
import LocationListView from "./LocationListView";

const defaultNavigationOptions = {
  headerTitleStyle: {
    fontWeight: "bold"
  }
};

const ReminderListStack = createStackNavigator(
  {
    ReminderListView: ReminderListView
  },
  {
    initialRouteName: routeNames.ReminderListView,
    defaultNavigationOptions: defaultNavigationOptions
  }
);

const ReminderEditionStack = createStackNavigator(
  {
    ReminderEditionView: ReminderEditionView,
    LocationListView: LocationListView,
    NewFavLocationView: NewFavLocationView
  },
  {
    initialRouteName: routeNames.ReminderEditionView,
    defaultNavigationOptions: defaultNavigationOptions
  }
);

const SettingsStack = createStackNavigator(
  {
    SettingsView: SettingsView,
    LocationListView: LocationListView,
    NewFavLocationView: NewFavLocationView
  },
  {
    initialRouteName: routeNames.SettingsView,
    defaultNavigationOptions: defaultNavigationOptions
  },
  {
    mode: "card",
    headerMode: "none"
  }
);

const RootStack = createStackNavigator(
  {
    ReminderListStack: {
      screen: ReminderListStack,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    SettingsView: {
      screen: SettingsStack,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    ReminderEditionView: {
      screen: ReminderEditionStack,
      navigationOptions: {
        gesturesEnabled: false
      }
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

export const NavigationStack = createAppContainer(RootStack);
