import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import PropTypes from 'prop-types';

import LoginBackground from './LoginBackground.js';
//import Buttons from './Buttons.js';

import SignInAs from './SignInAs.js';
import SignInAsHost from './SignInAsHost.js';
import SignInAsGuest from './SignInAsGuest.js';

import RegisterAs from './RegisterAs.js';


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }
    onPress() {
    }
  render() {
    return (
      <LoginBackground>
      </LoginBackground>
    );
  }
}
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F3AA3',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    //marginLeft: 'auto',
    },
    topView: {
      flex: 1,
      backgroundColor: '#3F3AA3',
      alignItems: 'center',
      justifyContent: 'center',
    },
});


//<SignInAs />
//<SignInAsGuest />
//<SignInAsHost />
//<RegisterAs />
*/
