import React from "react";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

export default styles = StyleSheet.create({
    todoItemText: {
      padding: 10,
      fontSize: 18,
      height: 35
    },
    dueDateText: {
      marginLeft: 10,
      color: 'grey'
    },
    overdueDateText: {
      marginLeft: 10,
      color: 'red'
    },
    doneItemText: {
      padding: 10,
      fontSize: 16,
      fontStyle: "italic",
      height: 35
    }
  });

  export const checkedicon = (
    <Icon name="checkbox-marked-circle-outline" type="material-community" />
  );
  export const uncheckedicon = (
    <Icon name="checkbox-blank-circle-outline" type="material-community" />
  );