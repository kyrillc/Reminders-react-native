"use strict";

import React, {Component} from "react";
import { View, FlatList } from "react-native";
import { List } from "react-native-elements";
import PropTypes from "prop-types";
import styles from "./styles";

class ListView extends Component {

  _keyExtractor = (item, index) => item + index;

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <List containerStyle={styles.listContainer}>
            <FlatList
              data={this.props.listData}
              renderItem={this.props.renderItem}
              keyExtractor={this._keyExtractor.bind(this)}
            />
          </List>
        </View>
      </View>
    );
  }
}

ListView.propTypes = {
  listData: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired
};

export default ListView;
