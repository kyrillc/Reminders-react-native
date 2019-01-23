"use strict";

import geolib from "geolib";

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

export default class LocationUtilities {
  
  static getLocation(geo_success, geo_error) {
    navigator.geolocation.requestAuthorization();
    const geo_options = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };
    navigator.geolocation.getCurrentPosition(geo_success, geo_error, geo_options);
  }

  static mapRegionFromCoordinates(coordinates) {
    return {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      latitudeDelta: coordinates.latitudeDelta ? coordinates.latitudeDelta : LATITUDE_DELTA,
      longitudeDelta: coordinates.longitudeDelta ? coordinates.longitudeDelta : LONGITUDE_DELTA
    };
  }

  static regionsBoundsCoordinates(region) {
    const westLongitude = region.longitude - region.longitudeDelta / 2; // westLng - min lng
    const southLatitude = region.latitude - region.latitudeDelta / 2; // southLat - min lat
    const eastLongitude = region.longitude + region.longitudeDelta / 2; // eastLng - max lng
    const northLatitude = region.latitude + region.latitudeDelta / 2; // northLat - max lat

    return {
      northWestCoords: {
        longitude: westLongitude,
        latitude: northLatitude
      },
      northEastCoords: {
        longitude: eastLongitude,
        latitude: northLatitude
      },
      southWestCoords: {
        longitude: westLongitude,
        latitude: southLatitude
      },
      southEastCoords: {
        longitude: eastLongitude,
        latitude: southLatitude
      }
    };
  }

  static regionSize(region) {
    const {
      northWestCoords,
      northEastCoords,
      southWestCoords,
      southEastCoords
    } = this.regionsBoundsCoordinates(region);

    return {
      longitudeDistance: geolib.getDistance(northWestCoords, northEastCoords),
      latitudeDistance: geolib.getDistance(northWestCoords, southWestCoords)
    };
  }
}
