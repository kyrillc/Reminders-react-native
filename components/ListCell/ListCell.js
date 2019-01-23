"use strict";

import React from "react";
import { Text } from "react-native";
import PropTypes from "prop-types";
import { ListItem } from "react-native-elements";
import Swipeout from "react-native-swipeout";

function swipeoutBtns(onDelete, onEdit) {
  var btns = [];
  if (onEdit){
    btns.push({
      text: "Edit",
      onPress: onEdit,
      type: "default"
    });
  }
  if (onDelete) {
    btns.push({
      text: "Delete",
      onPress: onDelete,
      type: "delete"
    });
  }
  return btns;
}

const ListCell = props => (
  <Swipeout
    right={swipeoutBtns(props.onDelete, props.onEdit)}
    backgroundColor="white"
    autoClose={true}
    disabled={!props.swipeable}
  >
    <ListItem
      leftIcon={props.leftIcon}
      title={props.title}
      subtitle={props.subtitle ? <Text style={props.subtitleStyle}>{props.subtitle}</Text> : null}
      titleStyle={props.titleStyle}
      hideChevron={props.hideChevron}
      onPress={props.onPress}
    />
  </Swipeout>
);
ListCell.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  titleStyle: PropTypes.object,
  subtitleStyle: PropTypes.object,
  leftIcon: PropTypes.object,
  swipeable: PropTypes.bool,
  hideChevron: PropTypes.bool,
  onPress: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};
ListCell.defaultProps = {
  title: "Cell",
  swipeable: false
};

export default ListCell;
