"use strict";

import React from "react";
import PropTypes from "prop-types";
import ListCell from "../ListCell";
import styles from "./styles";
import FavLocationHandler from "../../dataHandlers/FavLocationHandler";

const LocationCell = props => {
  const {
    remindersCount,
    string
  } = FavLocationHandler.reminderCountStringForLocationId(props.location.id);

  return (
    <ListCell
      hideChevron={true}
      title={props.location.name}
      titleStyle={styles.locationText}
      subtitle={string}
      subtitleStyle={styles.subtitle}
      onPress={props.onSelect}
      onDelete={remindersCount < 1 ? props.onDelete : null}
      onEdit={props.onEdit}
      swipeable={true}
    />
  );
};
LocationCell.propTypes = {
  location: PropTypes.object.isRequired,
  onSelect: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};
LocationCell.defaultProps = {
  location: {
    id: "00000000-0000-0000-0000-000000000000",
    name: "Cupertino"
  }
};

export default LocationCell;
