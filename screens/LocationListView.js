"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import { ActionCreators } from "redux-undo";

import { NEW_ITEM_ROW } from "../constants/rowTypes";
import { EDITION_VIEW_MODE } from "../constants/editionMode";
import { routeNames } from "../constants/routeNames";

import ListView from "../components/ListView";
import LocationCell from "../components/LocationCell/LocationCell";
import ActionCell from "../components/ActionCell";
import { LocationsListNavigationOptions } from "../components/NavigationBar/NavigationOptions";

import NavigationScreen from "./NavigationScreen";
import FavLocationHandler from "../dataHandlers/FavLocationHandler";

class LocationListView extends Component {
  static navigationOptions = ({ navigation }) => {
    return LocationsListNavigationOptions;
  };

  constructor(props) {
    super(props);

    this.actionRowsCount = 1; // "New location" row

    this.newLocationRow = {
      title: "Add a location...",
      rowType: NEW_ITEM_ROW,
      done: false
    };
  }

  componentWillUnmount() {
    // Reset the location list change history when leaving the view
    // -> That way, user can only undo changes they just made, and not previous ones.
    this.props.clearActionsHistory();
  }

  _listData() {
    return [this.newLocationRow].concat(this.props.locations);
  }

  _onListItemPressed(index) {
    if (this._listData()[index].rowType == NEW_ITEM_ROW) {
      this.props.navigation.navigate(routeNames.NewFavLocationView, {
        editionMode: EDITION_VIEW_MODE.NEW
      });
    } else {
      const locationIndex = index - this.actionRowsCount;
      const onLocationSelected = this.props.navigation.getParam(
        "onLocationSelected"
      );
      if (onLocationSelected != null) {
        onLocationSelected(this.props.locations[locationIndex]);
        this.props.navigation.goBack();
      }
    }
  }

  _onEditLocation(location) {
    this.props.navigation.navigate(routeNames.NewFavLocationView, {
      editionMode: EDITION_VIEW_MODE.EDIT,
      location: location
    });
  }

  _renderItem = ({ item, index }) => {
    var cell = <View />;
    if (this._listData()[index].rowType == NEW_ITEM_ROW) {
      cell = (
        <ActionCell
          title={item.title}
          rowType={item.rowType}
          onPress={() => this._onListItemPressed(index)}
        />
      );
    } else {
      cell = (
        <LocationCell
          location={item}
          onSelect={() => this._onListItemPressed(index)}
          onDelete={() => FavLocationHandler.deleteLocation(item.id)}
          onEdit={() => this._onEditLocation(item)}
        />
      );
    }
    return cell;
  };

  render() {
    return (
      <NavigationScreen navigation={this.props.navigation}>
        <ListView listData={this._listData()} renderItem={this._renderItem} />
      </NavigationScreen>
    );
  }
}

const mapStateToProps = state => {
  return {
    locations: state.locations.present
  };
};

const mapDispatchToProps = dispatch => ({
  clearActionsHistory: () => dispatch(ActionCreators.clearHistory())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationListView);
