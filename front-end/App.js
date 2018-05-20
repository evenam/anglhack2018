import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {createStackNavigator} from 'react-navigation';
import { gql, graphql } from 'react-apollo';

/*
import Login from './components/Login.js';
import Buttons from './components/Buttons.js';
*/
import LoginBackground from './components/LoginBackground.js';

import SignInAs from './components/SignInAs.js';
import SignInAsHost from './components/SignInAsHost.js';
import SignInAsGuest from './components/SignInAsGuest.js';

import RegisterAs from './components/RegisterAs.js';

import GuestHome from './components/Guest/Home.js';
import HostHome from './components/Host/Home.js';

const RootStack = createStackNavigator(
  {
    LoginScreen: LoginBackground,
    SignInAsScreen: SignInAs,
    RegisterAsScreen: RegisterAs,
    SignInAsGuestScreen: SignInAsGuest,
    SignInAsHostScreen: SignInAsHost,
    HostScreen: HostHome,
    GuestScreen: GuestHome,
  },
  {
    initialRouteName: 'LoginScreen',
  },
  {
    headerMode: 'screen',
  }
);

//AppRegistry.registerComponent('App', () => App);


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.isUserLoggedIn = false;
    this.isUserGuest = true;
  }
  render() {
    //let root = <Login></Login>;
    if (this.isUserLoggedIn) {
      if (this.isUserGuest) {
        //root = <GuestHome></GuestHome>;
        RootStack.initialRouteName = <GuestHome></GuestHome>;
      } else {
        //root = <HostHome></HostHome>;
        RootStack.initialRouteName = <HostHome></HostHome>;
      }
    }
    //else {
    //  root =
    //}
    //return (
    //  root
    //);
    //return root;
    // return <RootStack></RootStack>;
    return <GuestHome></GuestHome>;
  }
}
/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/
