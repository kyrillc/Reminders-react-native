"use strict";

import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Button, FormLabel, FormInput } from "react-native-elements";
import uuidv4 from "uuid/v4";

import { EDITION_VIEW_MODE } from "../constants/editionMode";
import LocationUtilities from "../utilities/LocationUtilities";
import FavLocationHandler from "../dataHandlers/FavLocationHandler";

import LocationSelectionMap from "./LocationSelectionMap";
import NavigationScreen from "./NavigationScreen";

export default class NewFavLocationView extends Component {
  constructor(props) {
    super(props);

    this.editionMode = this.props.navigation.getParam("editionMode");

    if (this.editionMode == EDITION_VIEW_MODE.NEW) {
      this.state = {
        entryIsValid: false,
        locationName: null
      };
    } else if (this.editionMode == EDITION_VIEW_MODE.EDIT) {
      this.loadedLocation = this.props.navigation.getParam("location");
      this.location = this.loadedLocation;
      this.state = {
        entryIsValid: true,
        locationName: this.loadedLocation.name
      };
    }
  }

  onLocationNameChanged = locationName => {
    this.setState({
      locationName: locationName,
      entryIsValid: locationName.length > 0
    });
  };

  onSelectedLocationChanged = selectedLocation => {
    this.location = selectedLocation;
  };

  onSave = () => {
    if (this.editionMode == EDITION_VIEW_MODE.NEW) {
      const location = {
        id: uuidv4(),
        latitude: this.location.latitude,
        longitude: this.location.longitude,
        latitudeDelta: this.location.latitudeDelta,
        longitudeDelta: this.location.longitudeDelta,
        radius: this.location.radius,
        name: this.state.locationName
      };
      FavLocationHandler.addLocation(location);
    } else if (this.editionMode == EDITION_VIEW_MODE.EDIT) {
      const editedLocation = {
        id: this.loadedLocation.id,
        latitude: this.location.latitude,
        longitude: this.location.longitude,
        latitudeDelta: this.location.latitudeDelta,
        longitudeDelta: this.location.longitudeDelta,
        radius: this.location.radius,
        name: this.state.locationName
      };
      FavLocationHandler.editLocation(editedLocation);
    }

    this.props.navigation.goBack();
  };

  render() {
    return (
      <NavigationScreen navigation={this.props.navigation}>
        <FormLabel>Location Name</FormLabel>
        <FormInput
          onChangeText={this.onLocationNameChanged.bind(this)}
          value={this.state.locationName}
          returnKeyType="done"
        />
        <LocationSelectionMap
          initialPosition={
            this.loadedLocation
              ? LocationUtilities.mapRegionFromCoordinates(this.loadedLocation)
              : null
          }
          onSelectedLocationChanged={this.onSelectedLocationChanged.bind(this)}
        />
        <Button
          style={styles.saveButton}
          title="Save"
          onPress={this.onSave}
          disabled={!this.state.entryIsValid}
          backgroundColor="#71a3f2"
        />
      </NavigationScreen>
    );
  }
}

const styles = StyleSheet.create({
  saveButton: {
    marginTop: 20,
    marginBottom: 20
  }
});
