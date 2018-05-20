import React from 'react';
import Dimensions from 'Dimensions';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button, Image } from 'react-native';

import SignInAs from './SignInAs.js';

import picSource from '../components/NapprBG.jpeg';

export default class Buttons extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }
    onPress() {
      //root = <SignInAs></SignInAs>;
    }
  render() {

    return (
      <View style={styles.bottomView}>
        <Button
            onPress={this.onPress}
            title="SIGN IN"
            color="#fff"
            accessibilityLabel="Learn more about this purple button"
        />
        <Button
            onPress={this.onPress}
            title="REGISTER"
            color="#fff"
            accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomView:{
    flex: 1,
    backgroundColor: '#3F3AA3',

    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: '100%',
    height: 80,
    position: 'absolute',
    bottom: 100,
    // zIndex: 1000
    //marginLeft: 'auto',
    //image: 'picSource',
    },
});
