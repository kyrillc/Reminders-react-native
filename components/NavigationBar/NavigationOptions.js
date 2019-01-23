"use strict";

import React from "react";
import CloseBarButton from "./CloseBarButton";
import UndoBarButtons from "./UndoBarButtons";
import SettingsBarButton from "./SettingsBarButton";

export const DefaultModalNavigationOptions = (title, dismissCallback) => ({
  title: title,
  headerLeft: <CloseBarButton onPress={dismissCallback} />
});

export const ReminderListNavigationOptions = leftButtonCallback => ({
  title: "Reminders",
  headerLeft: <SettingsBarButton leftButtonCallback={leftButtonCallback} />,
  headerRight: <UndoBarButtons />
});

export const LocationsListNavigationOptions = {
  title: "Saved locations",
  headerRight: <UndoBarButtons />
};
