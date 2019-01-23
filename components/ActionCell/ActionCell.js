"use strict";

import React from "react";
import PropTypes from "prop-types";
import ListCell from "../ListCell";
import { NAVIGATION_ROW, NEW_ITEM_ROW } from "../../constants/rowTypes";

import styles, { plusIcon } from "./styles";

const ActionCell = props => (
  <ListCell
    leftIcon={props.rowType == NEW_ITEM_ROW ? plusIcon : null}
    hideChevron={props.rowType !== NAVIGATION_ROW}
    title={props.title}
    titleStyle={
      props.rowType == NEW_ITEM_ROW ? styles.newItemText : styles.newItemText
    }
    onPress={props.onPress}
    swipeable={false}
  />
);
ActionCell.propTypes = {
  title: PropTypes.string.isRequired,
  rowType: PropTypes.string.isRequired,
  onPress: PropTypes.func
};
ActionCell.defaultProps = {
  title: "New reminder",
  rowType: NEW_ITEM_ROW
};

export default ActionCell;
