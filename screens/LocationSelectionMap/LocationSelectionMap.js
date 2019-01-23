"use strict";

import React, { Component } from "react";
import MapView from "react-native-maps";
import PropTypes from "prop-types";

import LocationUtilities from "../../utilities/LocationUtilities";
import Circle from "../../components/Circle";

import styles from "./styles";

const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

const CIRCLE_WIDTH_RATE = 0.5; // Circle width = MapView width * CIRCLE_WIDTH_RATE

export default class LocationSelectionMap extends Component {
  constructor(props) {
    super(props);
    const defaultPosition = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    };
    this.state = {
      initialMapRegion: props.initialPosition ? props.initialPosition : defaultPosition,
      mapViewWidth: 0
    };
    this.selectionRegion = props.initialPosition ? props.initialPosition : defaultPosition;
  }

  location_success(position) {
    const userRegion = LocationUtilities.mapRegionFromCoordinates(position.coords);
    this.updateSelectedLocation(userRegion);
    this.setState({
      initialMapRegion: userRegion
    });
  }
  location_error(error) {
    // No location received -> display default location -> no need to alert user.
    console.log("Geolocation Error: " + JSON.stringify(error));
  }

  componentWillMount() {
    if (this.props.initialPosition == null){
      LocationUtilities.getLocation(this.location_success.bind(this), this.location_error.bind(this));
    }
  }

  selectionRadius() {
    const { longitudeDistance } = LocationUtilities.regionSize(
      this.selectionRegion
    );
    return (longitudeDistance * CIRCLE_WIDTH_RATE) / 2;
  }

  updateSelectedLocation(region) {
    this.selectionRegion = region;
    const location = {
      latitude: this.selectionRegion.latitude,
      longitude: this.selectionRegion.longitude,
      latitudeDelta: this.selectionRegion.latitudeDelta,
      longitudeDelta: this.selectionRegion.longitudeDelta,
      radius: this.selectionRadius()
    };
    this.props.onSelectedLocationChanged(location);
  }

  render() {
    return (
      <MapView
        onLayout={event => {
          const { width } = event.nativeEvent.layout;
          this.setState({ mapViewWidth: width });
        }}
        style={styles.map}
        showUserLocation={(this.props.initialPosition == null)}
        rotateEnabled={false}
        region={this.selectionRegion}
        onRegionChangeComplete={this.updateSelectedLocation.bind(this)}
      >
        <Circle diameter={this.state.mapViewWidth * CIRCLE_WIDTH_RATE} />
      </MapView>
    );
  }

  static propTypes = {
    initialPosition: PropTypes.object,
    onSelectedLocationChanged: PropTypes.func
  }
}
