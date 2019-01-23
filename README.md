# Reminders (React Native)

This is a simple reminders app I did in order to get familiar with **React Native** and **Redux**.
It runs on iOS, and making it run on Android should not require that much work.

## Features

This app lets you:

* Add and manage scheduled reminders, and location-based reminders.
* Add and manage a list of favourite locations.
* Undo/Redo actions on reminders or favourite locations.

## Main packages used

### UI:

* [**React Navigation**](https://reactnavigation.org) - Used to manage navigation between views.
* [**React Native Elements**](https://react-native-training.github.io/react-native-elements/) - Provides nice ready-to-use UI elements.
* [**react-native-swipeout**](https://github.com/dancormier/react-native-swipeout) - Used to replicate the iOS "Swipe to delete" effect.
* [**react-native-modal-datetime-picker**](https://github.com/mmazzarolo/react-native-modal-datetime-picker) - Used to display a native DateTime Picker.
* [**react-native-maps**](https://github.com/react-native-community/react-native-maps) - Used to display a MapView.

### Managing the state:

* [**React Redux**](https://react-redux.js.org) - Really useful when debugging user actions, and essential for the Undo/Redo feature.
* [**redux-undo**](https://github.com/omnidan/redux-undo) - Used to add Undo/Redo features on reducers.


### Geofencing:

* [**react-native-background-geolocation**](https://github.com/transistorsoft/react-native-background-geolocation) (from Transistor Software)

### Notifications:

* [**React Native Push Notification**](https://github.com/zo0r/react-native-push-notification)


## Setting up

In the project directory, install the dependencies:

```
$ yarn install
```


## Running the app

**Running on iOS:**

```
$ react-native run-ios
```

Alternatively, you can also open the Xcode project **ios/Reminders.xcodeproj** and compile & run from Xcode.

**Android version:**

For now, the app has only been tested on iOS, but running it on Android should be pretty straightforward, by generating the Android project, and following the instructions of the different packages that require changes to the native project.