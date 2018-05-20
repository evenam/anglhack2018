import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './components/Login.js';
import GuestHome from './components/Guest/Home.js';
import HostHome from './components/Host/Home.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.isUserLoggedIn = true;
    this.isUserGuest = true;
  }
  render() {
    let root = <Login></Login>;
    if (this.isUserLoggedIn) {
      if (this.isUserGuest) {
        root = <GuestHome></GuestHome>;
      } else {
        root = <HostHome></HostHome>;
      }
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
