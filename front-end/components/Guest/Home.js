import React from 'react';
import Listing from './Listing.js';
import MapView from './MapView';
import ListView from './ListView';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
        this.state = {text: 'Placehol der'};
        this.showListing = false;
        this.showMapView = false;
        this.showListView = true;
    }
    onPress() {

    }
    state = {
    modalVisible: false,
  };
  static navigationOptions = {
    header: null,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render() {
    let root;
    if (this.showListing) {
        root = <Listing></Listing>;
    } 
    if (this.showMapView) {
        root = <MapView></MapView>;
    } else if (this.showListView) {
        root = <ListView></ListView>;
    }
    return (
      root
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
    // paddingTop: 100, 
    // justifyContent: 'center',
    // textAlignVertical: 'top'

  }
});
