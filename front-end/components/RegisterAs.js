import React from 'react';
import Dimensions from 'Dimensions';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button, Image, ImageBackground } from 'react-native';

//import picSource from '../components/NapprBG.jpeg';
import picSource from '../components/BlankPurpleBG.jpeg';
import picSource2 from '../components/nycblur1.jpg';

export default class RegisterAs extends React.Component {
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

        <Image source= {picSource} style={styles.picture2}/>
        <View style={styles.bottomView}>

          <Button style
              onPress={this.onPress}
              //onPress={() =>
              //  this.props.navigation.navigate('SignInAsScreen')
              //}
              title="SIGN UP WITH FACEBOOK"
              color="#fff"
          />
          <Text style={styles.textStyle2}> or </Text>
          <Button
              onPress={this.onPress}
              //onPress={() =>
              //  this.props.navigation.navigate('RegisterAsScreen')
              //}
              title="SIGN UP WITH EMAIL"
              color="#fff"
              //accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
      fontSize: 18,
      color: "#000",
      //fontWeight: 'bold',
      alignSelf: 'center',
      //backgroundColor: "#FFF",
      padding: 20,
      justifyContent: 'space-around',
  },

  textStyle2: {
      //marginLeft: 100,
      fontSize: 12,
      color: "#FFFFFF",
      //fontWeight: 'bold',
      //alignSelf: 'flex-start',
      padding: 10,
      alignSelf: 'center',
  },

  textStyle3: {
      fontSize: 22,
      color: "#FFFFFF",
      alignSelf: 'center',
      bottom: 46,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  picture: {
    flex: 1,
    height: null,
    width: null,
  },
  picture2: {
    flex: 1,
    height: null,
    width: null,
    opacity: 0.8,
  },

  bottomView:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    width: '100%',
    height: 80,
    position: 'absolute',
    bottom: 400,
  },
});
