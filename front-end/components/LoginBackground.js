import React from 'react';
import Dimensions from 'Dimensions';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button, Image, ImageBackground, TouchableHighlight } from 'react-native';
//import {StackNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation';
//import { Navigation } from '../Navigation/Navigation';

import picSource from '../components/NapprBG.jpeg';
import picSource2 from '../components/nycblur1.jpg';
import SignInAs from './SignInAs.js';
import SignInAsHost from './SignInAsHost.js';
import SignInAsGuest from './SignInAsGuest.js';


export default class LoginBackground extends React.Component {
  constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }
  onPress() {
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    //console.log("this.props.navigation = " + util.inspect(this.props.navigation, false, null));
    //var { navigate } = this.props.navigation;
    return (
      //const { navigate } = this.props.navigation;

      <ImageBackground style={styles.picture} source={picSource2}>
        {this.props.source}
        //<View style={styles.overlay}></View>

        <Image source= {picSource} style={styles.picture2}/>
        <View style={styles.bottomView}>

          <Button
              //onPress={this.onPress}
              onPress={() =>
                this.props.navigation.navigate('SignInAsScreen')
              }
              title="SIGN IN"
              color="#fff"
              //accessibilityLabel="Learn more about this purple button"
          />
          <Button
              //bordered=true
              //onPress={this.onPress}
              onPress={() =>
                this.props.navigation.navigate('RegisterAsScreen')
              }
              title="REGISTER"
              color="#fff"
              //accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </ImageBackground>

      /*

      <View style={styles.bottomView}>
        <TouchableHighlight onPress={this._onPressButton}>
          <Text style = {styles.textStyle2} > "sign in"</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onPressButton}>
          <Text style = {styles.textStyle2} > "register"</Text>
        </TouchableHighlight>
      </View>
      */

    );
  }
}

const styles = StyleSheet.create({

    //container: {
    //    backgroundColor:'red',
    //    opacity: 0.6
    //},
    //overlay: {
    //    backgroundColor:'transparent',
    //    opacity: 0.6
    //},
    /*
    avatarStyle: {
        width:100,
        height: 100,
        marginTop: 10,
        borderRadius: 50,
        alignSelf: 'center',
    },
    */

    textStyle: {
        marginTop: 200,
        fontSize: 18,
        color: "#FFFFFF",
        fontWeight: 'bold',
        alignSelf: 'center',
    },

    textStyle2: {
        marginTop: 200,
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: 'bold',
        alignSelf: 'center',

        //flex: 1,
        //backgroundColor: '#3F3AA3',
        /*
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '100%',
        height: 80,
        position: 'absolute',
        bottom: 100,
        */

    },


    //balanceContainer: {
    //    padding:10,
    //},
    button: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10
    },
    picture: {
      flex: 1,
      height: null,
      width: null,
    // zIndex: -700,

    //resizeMode: 'cover',
      //opacity: 0.5,
    },
    picture2: {
      flex: 1,
      height: null,
      width: null,
    // zIndex: -700,

    //resizeMode: 'cover',
      opacity: 0.8,
    },

    bottomView:{
      flex: 1,
      //backgroundColor: '#3F3AA3',

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
