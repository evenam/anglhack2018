import React from 'react';
import Dimensions from 'Dimensions';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button, Image, ImageBackground } from 'react-native';
import { gql, graphql } from 'react-apollo';


import picSourceBG from '../components/BlankPurpleBG.jpeg';
import picSource2 from '../components/nycblur1.jpg';

export default class SignInAs extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
    }
    onPress() {

    }
  render() {

    return (
      <ImageBackground style={styles.picture} source={picSource2}>
        {this.props.source}
        //<View style={styles.overlay}></View>

        <Image source= {picSourceBG} style={styles.picture2}/>
        <View style={styles.bottomView}>

          <Button
              //onPress={this.onPress}
              onPress={() =>
                this.props.navigation.navigate('SignInAsGuestScreen')
              }
              title="LOG IN AS A GUEST"
              color="#fff"
              //accessibilityLabel="Learn more about this purple button"
          />
          <View style={styles.hairline} />
          <Button
              //bordered=true
              //onPress={this.onPress}
              onPress={() =>
                this.props.navigation.navigate('SignInAsHostScreen')
              }
              title="LOG IN AS A HOST"
              color="#fff"
              //accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </ImageBackground>
      /*
      <View style={styles.bottomView}>
        <Button
            onPress={this.onPress}
            title="LOG IN AS A GUEST"
            color="#fff"
            accessibilityLabel="Learn more about this purple button"
        />

        <Button
            onPress={this.onPress}
            title="LOG IN AS A HOST"
            color="#fff"
            accessibilityLabel="Learn more about this purple button"
        />

      </View>
      */
    );
  }
}

const styles = StyleSheet.create({

  textStyle: {
      marginTop: 200,
      fontSize: 18,
      color: "#FFFFFF",
      fontWeight: 'bold',
      alignSelf: 'center',
  },

  textStyle2: {
      //marginTop: 200,
      fontSize: 22,
      color: "#FFFFFF",
      fontWeight: 'bold',
      alignSelf: 'center',
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

  hairline: {
    backgroundColor: '#FFFFFF',
    height: 1,
    width: 165
  },

  bottomView:{
    flex: 1,
    //backgroundColor: '#3F3AA3',

    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    width: '100%',
    height: 80,
    position: 'absolute',
    bottom: 400,
    // zIndex: 1000
    //marginLeft: 'auto',
    //image: 'picSource',
  },
});
