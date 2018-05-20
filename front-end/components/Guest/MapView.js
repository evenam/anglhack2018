import React from 'react';
import Listing from './Listing.js';
import { StyleSheet, Text, View, Button, TextInput, Platform } from 'react-native';

export default class MapView extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
        this.state = {text: 'Placeholder'};
        this.showListing = true;
        this.showMapView = true;
        this.showListView = false;
    }
    onPress() {

    }
  render() {
    return (
      <View style={styles.container}>
        <Text>Guest Home</Text>
        <Text>Map View</Text>
        <TextInput style={styles.searchInput}
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}></TextInput>
        <View style={styles.container2}>
            
            </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 100, 
    // justifyContent: 'center',
    // textAlignVertical: 'top'

  },
  searchInput: {
    flex:  -.04,
    height:40, 
    width: '70%',
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 25,
    textAlign: 'center',
    // textAlignVertical: 'top'
  }
});
